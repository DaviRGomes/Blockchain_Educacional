import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import HashModule from '../components/HashModule';


const renderComponent = () => {
  render(
    <MemoryRouter>
      <HashModule />
    </MemoryRouter>
  );
};

describe('HashModule', () => {
  it('correctly calculates SHA256 hash on the practice tab', async () => {
    renderComponent();

    const praticaTabButton = screen.getByRole('button', { name: 'Prática' });
    await userEvent.click(praticaTabButton);

    const textarea = screen.getByPlaceholderText('Digite o texto para gerar o hash...');
    const inputText = 'hello world';
    await userEvent.type(textarea, inputText);

    const encryptButton = screen.getByRole('button', { name: 'Criptografar' });
    await userEvent.click(encryptButton);

    const expectedHash = CryptoJS.SHA256(inputText).toString();
    const hashOutput = screen.getByLabelText('Hash (SHA256):') as HTMLInputElement;
    expect(hashOutput.value).toBe(expectedHash);
  });

  it('switches between Teoria, Quiz, and Pratica tabs', async () => {
    renderComponent();


    let teoriaTab = screen.getByRole('button', { name: 'Teoria' });
    expect(teoriaTab).toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Teoria - Hash' })).toBeInTheDocument();

    const quizTabButton = screen.getByRole('button', { name: 'Quiz' });
    await userEvent.click(quizTabButton);
    expect(quizTabButton).toHaveClass('active');
    expect(teoriaTab).not.toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Quiz - Hash' })).toBeInTheDocument();


    const praticaTabButton = screen.getByRole('button', { name: 'Prática' });
    await userEvent.click(praticaTabButton);
    expect(praticaTabButton).toHaveClass('active');
    expect(quizTabButton).not.toHaveClass('active');
    expect(screen.getByRole('heading', { name: 'Prática - Hash' })).toBeInTheDocument();
  });
});
