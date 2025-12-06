import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import BlockchainModule from '../components/BlockchainModule';


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
      <BlockchainModule />
    </MemoryRouter>
  );
};


const getBlockByNumber = (number: number) => {

  const heading = screen.getByText(`Bloco #${number}`);
  return heading.closest('div[style*="border: 1px solid"]'); 
};

describe('BlockchainModule', () => {

  it('switches between Teoria, Quiz, and Pratica tabs', async () => {
    renderComponent();

    const teoriaTab = screen.getByRole('button', { name: 'Teoria' });
    const quizTab = screen.getByRole('button', { name: 'Quiz' });
    const praticaTab = screen.getByRole('button', { name: 'Prática' });

    expect(teoriaTab).toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Teoria - Blockchain' })).toBeInTheDocument();

    await userEvent.click(quizTab);
    expect(quizTab).toHaveClass('active');
    expect(screen.getByTestId('mock-quiz')).toBeInTheDocument();

    await userEvent.click(praticaTab);
    expect(praticaTab).toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Prática - Blockchain' })).toBeInTheDocument();
  });

  it('invalidates subsequent blocks when a block data is changed', async () => {
    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Prática' }));

    const block2 = getBlockByNumber(2)!;
    const block3 = getBlockByNumber(3)!;

    const dataInputBlock2 = within(block2).getByLabelText('Dados:');
    await userEvent.clear(dataInputBlock2);
    await userEvent.type(dataInputBlock2, 'Data Alterada');

    await waitFor(() => {
      expect(within(block2).getByText('Inválido')).toBeInTheDocument();
      expect(within(block3).getByText('Inválido')).toBeInTheDocument();
    });
  });


  it('attempts to re-validate the chain when blocks are re-mined', async () => {
    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Prática' }));
    
    const block2 = getBlockByNumber(2)!;

    const nonceInput = within(block2).getByLabelText('Nonce:') as HTMLInputElement;
    const initialNonce = nonceInput.value;


    const dataInputBlock2 = within(block2).getByLabelText('Dados:');
    await userEvent.clear(dataInputBlock2);
    await userEvent.type(dataInputBlock2, 'uma nova data');
    await waitFor(() => expect(within(block2).getByText('Inválido')).toBeInTheDocument());

    await userEvent.click(within(block2).getByRole('button', { name: 'Minerar' }));
    await waitFor(() => {
      expect(nonceInput.value).not.toBe(initialNonce);
    }, { timeout: 5000 });
  });

  it('sets blockchainCompleted in localStorage upon quiz completion', async () => {
    localStorage.clear();

    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Quiz' }));

    const finishQuizButton = screen.getByRole('button', { name: 'Finish Quiz' });
    await userEvent.click(finishQuizButton);

    expect(localStorage.getItem('blockchainCompleted')).toBe('true');
  });
});
