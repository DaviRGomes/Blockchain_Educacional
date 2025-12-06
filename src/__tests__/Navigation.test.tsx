import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeAll } from 'vitest';
import App from '../App';

const setup = async (initialRoute = '/') => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
  const onboardingButton = await screen.findByRole('button', { name: /vamos lá|vamos\?/i });
  await userEvent.click(onboardingButton);
};

describe('App Navigation', () => {

  it.each([
    { module: 'Módulo 1: Hash', expectedTitle: 'Módulo 1: Hash' },
    { module: 'Módulo 2: Bloco', expectedTitle: 'Módulo 2: Blocos' },
    { module: 'Módulo 3: Blockchain', expectedTitle: 'Módulo 3: Blockchain' },
  ])('navigates from module list to $module', async ({ module, expectedTitle }) => {
    await setup();
    
    const moduleHeading = await screen.findByRole('heading', { name: module });
    const moduleSection = moduleHeading.closest('section')!;
    const startButton = within(moduleSection).getByRole('button', { name: 'INICIAR MÓDULO' });

    await userEvent.click(startButton);

    const newPageTitle = await screen.findByRole('heading', { name: expectedTitle, level: 2 });
    expect(newPageTitle).toBeInTheDocument();
  });

  it('navigates to the Intro Quiz', async () => {
    await setup();

    const introQuizButton = screen.getByRole('button', { name: 'FAZER QUIZ INICIAL' });
    await userEvent.click(introQuizButton);

    const newPageTitle = await screen.findByRole('heading', { name: 'Quiz Inicial', level: 2 });
    expect(newPageTitle).toBeInTheDocument();
  });

  it('navigates to the Final Quiz when modules are completed', async () => {
    localStorage.setItem('hashCompleted', 'true');
    localStorage.setItem('blockCompleted', 'true');
    localStorage.setItem('blockchainCompleted', 'true');
    
    await setup();

    const finalQuizButton = screen.getByRole('button', { name: 'FAZER QUIZ FINAL' });
    expect(finalQuizButton).not.toBeDisabled();

    await userEvent.click(finalQuizButton);

    const newPageTitle = await screen.findByRole('heading', { name: 'Quiz Final', level: 2 });
    expect(newPageTitle).toBeInTheDocument();

    localStorage.clear();
  });

  it('shows Final Quiz button as disabled if modules are not completed', async () => {
    localStorage.clear();
    
    await setup();

    const finalQuizButton = screen.getByRole('button', { name: 'FAZER QUIZ FINAL' });
    expect(finalQuizButton).toBeDisabled();
  });
});


