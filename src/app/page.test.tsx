import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Home from '~/app/page';
import MockAuthProvider from '~/utils/tests/MockAuthProvider';
import { ROUTES } from '~/utils/constants/routes';
import MockGlobalProvider from '~/utils/tests/MockGlobalProvider';

const mocks = vi.hoisted(() => ({
  useRouter: {
    push: vi.fn(),
  },
  useScoresAPI: {
    postScores: vi.fn(),
  },
}));

vi.mock('next/navigation', async () => ({
  useRouter: () => mocks.useRouter,
}));

vi.mock('~/core/hooks/apis/useScoresAPI.api', async () => ({
  useScoresAPI: () => mocks.useScoresAPI,
}));

describe('HomePage', () => {
  it('should render the HomePage with unauthenticated user', () => {
    render(
      <MockAuthProvider>
        <Home />
      </MockAuthProvider>,
    );

    const welcomeLabel = screen.getByText('Welcome!');
    expect(welcomeLabel).not.toBeNull();

    const loginButton = screen.getByText('Login');
    expect(loginButton).not.toBeNull();

    const registerButton = screen.getByText('Register');
    expect(registerButton).not.toBeNull();

    loginButton.click();
    expect(mocks.useRouter.push).toHaveBeenCalledWith(ROUTES.LOGIN);

    registerButton.click();
    expect(mocks.useRouter.push).toHaveBeenCalledWith(ROUTES.REGISTER);
  });

  it('should render the HomePage with authenticated user', async () => {
    render(
      <MockGlobalProvider>
        <MockAuthProvider isAuthenticated>
          <Home />
        </MockAuthProvider>
      </MockGlobalProvider>,
    );

    expect(screen.queryByText('Welcome!')).toBeNull();
    expect(screen.queryByText('Login')).toBeNull();
    expect(screen.queryByText('Register')).toBeNull();

    const textFields = screen.getAllByRole<HTMLInputElement>('textbox');
    expect(textFields).toHaveLength(10);

    fireEvent.input(textFields[0], { target: { value: 'A' } });
    fireEvent.input(textFields[1], { target: { value: 'C' } });
    fireEvent.input(textFields[2], { target: { value: 'E' } });
    expect(textFields[0].value).toBe('A');
    expect(textFields[1].value).toBe('C');
    expect(textFields[2].value).toBe('E');

    const test = await screen.findByText('Score: 5');
    expect(test).not.toBeNull();

    const resetButton = screen.getByText('Reset Tiles');
    fireEvent.click(resetButton);
    expect(textFields[0].value).toBe('');
    expect(textFields[1].value).toBe('');
    expect(textFields[2].value).toBe('');

    const submitButton = screen.getByText('Save Score');
    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(mocks.useScoresAPI.postScores).toHaveBeenCalledWith({
      score: 0,
      string: '',
    });

    const viewScoresButton = screen.getByText('View Top Scores');
    fireEvent.click(viewScoresButton);
    expect(mocks.useRouter.push).toHaveBeenCalledWith(ROUTES.HIGH_SCORES);
  });
});
