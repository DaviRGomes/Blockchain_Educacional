import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  it('renders headline and initial onboarding', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Blockchain Educacional', level: 1 })
    ).toBeInTheDocument();

    expect(screen.getByText('Bem-vindo')).toBeInTheDocument();
  });
});
