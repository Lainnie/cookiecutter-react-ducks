import authReducers, { authInitialStates, authOperations } from '../../auth';

describe('auth reducers', () => {
  describe('auth/LOGIN_SUCCESS', () => {
    const setItem = localStorage.setItem;
    beforeEach(() => {
      localStorage.setItem = jest.fn();
    });

    afterEach(() => {
      localStorage.setItem = setItem;
    });

    it.only('updates username and accessToken', () => {
      const state = {
        ...authInitialStates,
        login: {
          ...authInitialStates.login,
          error: true, // Simulate a failed attempt
        },
      };
      const newState = authReducers(
        state,
        authOperations.loginSuccess({
          username: 'admin',
          accessToken: '1234567890',
        })
      );

      expect(newState).toMatchSnapshot();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'accessToken',
        '1234567890'
      );
      expect(localStorage.setItem).toHaveBeenCalledWith('username', 'admin');
    });
  });

  describe('auth/LOGIN_FAILURE', () => {
    it('resets any existing values', () => {
      const state = {
        ...authInitialStates,
        login: {
          ...authInitialStates.login,
          username: 'admin',
          accessToken: '1234567890',
        },
      };
      const newState = authReducers(
        state,
        authOperations.loginFailure({
          message: 'Invalid credentials',
          code: '10014',
        })
      );

      expect(newState).toMatchSnapshot();
    });
  });

  describe('auth/ALREADY_LOGGED_IN', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', '12345678');
      localStorage.setItem('username', 'admin');
    });

    it('gets localStorage accessToken and username', () => {
      const newState = authReducers(
        authInitialStates,
        authOperations.alreadyLoggedIn()
      );

      expect(newState).toMatchSnapshot();
    });
  });
});
