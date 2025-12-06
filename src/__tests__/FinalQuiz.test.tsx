import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import FinalQuiz from '../components/FinalQuiz';
import ModulesList from '../components/ModulesList';

// Mock the Quiz component
vi.mock('../components/Quiz', () => ({
  default: ({ onFinish }: { onFinish: (score: number, total: number) => void }) => (
    <div data-testid="mock-quiz">
      <h3>Mock Quiz</h3>
      {/* Simulate finishing with a 12/15 score */}
      <button onClick={() => onFinish(12, 15)}>Finish Quiz</button>
    </div>
  ),
}));

describe('FinalQuiz', () => {
  // Clear localStorage before each test to ensure isolation
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem'); // Spy on setItem
    vi.spyOn(Storage.prototype, 'getItem'); // Spy on getItem
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Clean up spies
  });

  // Helper to render the component within a router context
  const renderComponent = (initialEntries = ['/final-quiz']) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/final-quiz" element={<FinalQuiz />} />
          <Route path="/modules" element={<ModulesList />} />
        </Routes>
      </MemoryRouter>
    );
  };

  // Test 1: Not Ready State
  it('shows "not ready" message if modules are not completed', () => {
    // Default localStorage is empty, so modules are not completed
    renderComponent();

    expect(screen.getByText('Você ainda não concluiu todos os módulos.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Voltar aos módulos' })).toBeInTheDocument();
    expect(screen.queryByTestId('mock-quiz')).not.toBeInTheDocument();
  });

  // Test 2: Ready State - Quiz Rendered
  it('renders the quiz when all modules are completed', () => {
    localStorage.setItem('hashCompleted', 'true');
    localStorage.setItem('blockCompleted', 'true');
    localStorage.setItem('blockchainCompleted', 'true');
    renderComponent();

    expect(screen.queryByText('Você ainda não concluiu todos os módulos.')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-quiz')).toBeInTheDocument();
  });

  // Test 3: Ready State - Quiz Finished & Results Displayed
  it('displays results and saves to localStorage after quiz completion', async () => {
    localStorage.setItem('hashCompleted', 'true');
    localStorage.setItem('blockCompleted', 'true');
    localStorage.setItem('blockchainCompleted', 'true');
    localStorage.setItem('initialKnowledgeLevel', 'Iniciante');
    localStorage.setItem('initialScore', '3');
    localStorage.setItem('initialTotal', '10'); // Total initial questions

    renderComponent();

    // Finish the quiz
    const finishButton = screen.getByRole('button', { name: 'Finish Quiz' });
    await userEvent.click(finishButton);

    // Assert localStorage updates for final results
    expect(localStorage.setItem).toHaveBeenCalledWith('finalKnowledgeLevel', 'Avançado'); // 12/15 = 80% (Avançado)
    expect(localStorage.setItem).toHaveBeenCalledWith('finalScore', '12');
    expect(localStorage.setItem).toHaveBeenCalledWith('finalTotal', '15');

    // Assert final results display
    expect(screen.getByRole('heading', { name: 'Resultado do Quiz Final' })).toBeInTheDocument();
    expect(screen.getByText(/Você acertou 12 de 15 \(80%\)\./i)).toBeInTheDocument();
    const finalLevelParagraph = screen.getByText(/Nível final:/i);
    expect(within(finalLevelParagraph).getByText(/Avançado/i)).toBeInTheDocument();

    // Assert comparison with initial results
    const initialLevelParagraph = screen.getByText(/Nível inicial:/i);
    expect(within(initialLevelParagraph).getByText(/Iniciante/i)).toBeInTheDocument();
    expect(screen.getByText(/Acertos iniciais: 3 de 10 \(30%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Variação: 50%/i)).toBeInTheDocument(); // 80 - 30 = 50

    // Assert "Voltar aos módulos" button
    expect(screen.getByRole('button', { name: 'Voltar aos módulos' })).toBeInTheDocument();
  });

  it('navigates to modules when "Voltar aos módulos" button is clicked', async () => {
    localStorage.setItem('hashCompleted', 'true');
    localStorage.setItem('blockCompleted', 'true');
    localStorage.setItem('blockchainCompleted', 'true');
    
    renderComponent();

    // For the "not ready" state
    let backButton = screen.queryByRole('button', { name: 'Voltar aos módulos' });
    if (backButton) {
      await userEvent.click(backButton);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Módulos' })).toBeInTheDocument();
      });
      renderComponent(); // Re-render for the next case
    }
    
    // For the "results" state
    const finishButton = screen.getByRole('button', { name: 'Finish Quiz' });
    await userEvent.click(finishButton); // Finish quiz to show results
    
    backButton = screen.getByRole('button', { name: 'Voltar aos módulos' });
    await userEvent.click(backButton);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Módulos' })).toBeInTheDocument();
    });
  });
});
