import { authSelectors, authInitialStates } from '../../auth';

describe('auth selectors', () => {
  it('returns error using .getSubmitError', () => {
    const state = {
      auth: {
        ...authInitialStates,
        login: {
          accessToken: '1234567890',
          error: true,
        },
      },
    };

    expect(authSelectors.getSubmitError(state)).toMatchSnapshot();
  });

  it('returns accessToken using .getToken', () => {
    const state = {
      auth: {
        ...authInitialStates,
        login: {
          accessToken: '1234567890',
        },
      },
    };

    expect(authSelectors.getToken(state)).toMatchSnapshot();
  });

  it('returns username using .getUsername', () => {
    const state = {
      auth: {
        ...authInitialStates,
        login: {
          username: 'storetail',
        },
      },
    };

    expect(authSelectors.getUsername(state)).toMatchSnapshot();
  });

  it('returns accountId using .getAccountId', () => {
    const state = {
      auth: {
        ...authInitialStates,
        login: {
          accountId: 1,
        },
      },
    };

    expect(authSelectors.getAccountId(state)).toMatchSnapshot();
  });
});
