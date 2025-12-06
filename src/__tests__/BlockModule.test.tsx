import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import BlockModule from '../components/BlockModule';

vi.mock('../components/Quiz', () => ({
  default: ({ onFinish }: { onFinish: (score: number, total: number) => void }) => (
    <div data-testid="mock-quiz">
      <h3>Mock Quiz</h3>
      <button onClick={() => onFinish(10, 10)}>Finish Quiz</button>
    </div>
  ),
}));

const renderComponent = () => {
  render(
    <MemoryRouter>
      <BlockModule />
    </MemoryRouter>
  );
};

describe('BlockModule', () => {

  it('switches between Teoria, Quiz, and Pratica tabs', async () => {
    renderComponent();

    const teoriaTab = screen.getByRole('button', { name: 'Teoria' });
    expect(teoriaTab).toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Teoria - Blocos' })).toBeInTheDocument();

    const quizTabButton = screen.getByRole('button', { name: 'Quiz' });
    await userEvent.click(quizTabButton);
    expect(quizTabButton).toHaveClass('active');
    expect(teoriaTab).not.toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Quiz - Blocos' })).toBeInTheDocument();
    expect(screen.getByTestId('mock-quiz')).toBeInTheDocument(); // Check for mocked Quiz component

    const praticaTabButton = screen.getByRole('button', { name: 'Prática' });
    await userEvent.click(praticaTabButton);
    expect(praticaTabButton).toHaveClass('active');
    expect(quizTabButton).not.toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Prática - Bloco com SHA256 e Mineração' })).toBeInTheDocument();
  });

  it('mines a valid block and updates fields', async () => {
    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Prática' })); 

    const numberInput = screen.getByLabelText('Número:') as HTMLInputElement;
    const dataInput = screen.getByLabelText('Dados:') as HTMLInputElement;
    const mineButton = screen.getByRole('button', { name: 'Minerar' });

    await userEvent.type(numberInput, '1');
    await userEvent.type(dataInput, 'Test Data');

    expect(screen.getByText('Estado do bloco: ❌ Inválido')).toBeInTheDocument();

    await userEvent.click(mineButton);

    await waitFor(() => {
      const nonceInput = screen.getByLabelText('Nonce:') as HTMLInputElement;
      const hashOutput = screen.getByLabelText('Hash (SHA256):') as HTMLInputElement;
      
      expect(nonceInput.value).not.toBe('0');
      expect(hashOutput.value).toMatch(/^0{4,}/);
      expect(screen.getByText('Estado do bloco: ✅ Válido')).toBeInTheDocument();
    }, { timeout: 5000 }); 
  });

  it('invalidates a block when its data changes after mining', async () => {
    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Prática' })); 

    const numberInput = screen.getByLabelText('Número:') as HTMLInputElement;
    const dataInput = screen.getByLabelText('Dados:') as HTMLInputElement;
    const mineButton = screen.getByRole('button', { name: 'Minerar' });

    await userEvent.type(numberInput, '2');
    await userEvent.type(dataInput, 'Initial Data');
    await userEvent.click(mineButton);

    await waitFor(() => {
      expect(screen.getByText('Estado do bloco: ✅ Válido')).toBeInTheDocument();
    }, { timeout: 5000 });

    await userEvent.clear(dataInput);
    await userEvent.type(dataInput, 'Changed Data');

    await waitFor(() => {
      expect(screen.getByText('Estado do bloco: ❌ Inválido')).toBeInTheDocument();
    });
  });

  it('sets blockCompleted in localStorage upon quiz completion', async () => {

    localStorage.clear();

    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Quiz' })); 

    const finishQuizButton = screen.getByRole('button', { name: 'Finish Quiz' }); 
    await userEvent.click(finishQuizButton);

    expect(localStorage.getItem('blockCompleted')).toBe('true');
    expect(localStorage.getItem('blockScore')).toBe('10');
    expect(localStorage.getItem('blockTotal')).toBe('10');
  });
});
