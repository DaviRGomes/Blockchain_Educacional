import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import IntroQuiz from '../components/IntroQuiz';
import ModulesList from '../components/ModulesList';

vi.mock('../components/Quiz', () => ({
  default: ({ onFinish }: { onFinish: (score: number, total: number) => void }) => (
    <div data-testid="mock-quiz">
      <h3>Mock Quiz</h3>
      <button onClick={() => onFinish(7, 10)}>Finish Quiz</button>
    </div>
  ),
}));

describe('IntroQuiz', () => {
  it('renders the initial quiz heading and the quiz component', () => {
    render(
      <MemoryRouter>
        <IntroQuiz />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Quiz Inicial' })).toBeInTheDocument();
    expect(screen.getByTestId('mock-quiz')).toBeInTheDocument();
  });

  it('saves results to localStorage and navigates to modules on finish', async () => {
    localStorage.clear();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(
      <MemoryRouter initialEntries={['/intro-quiz']}>
        <Routes>
          <Route path="/intro-quiz" element={<IntroQuiz />} />
          <Route path="/modules" element={<ModulesList />} />
        </Routes>
      </MemoryRouter>
    );

    const finishButton = screen.getByRole('button', { name: 'Finish Quiz' });
    await userEvent.click(finishButton);

    expect(setItemSpy).toHaveBeenCalledWith('initialKnowledgeLevel', 'Avançado');
    expect(setItemSpy).toHaveBeenCalledWith('initialScore', '7');
    expect(setItemSpy).toHaveBeenCalledWith('initialTotal', '10');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Módulos' })).toBeInTheDocument();
    });

    setItemSpy.mockRestore();
  });
});
