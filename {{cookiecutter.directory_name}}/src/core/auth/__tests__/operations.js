import { authOperations } from '../../auth';

describe('auth operations', () => {
  it('has a .loginSuccess methods', () => {
    const user = {
      username: 'Storetail',
      accessToken: '1234567890',
    };

    expect(authOperations.loginSuccess(user)).toMatchSnapshot();
  });

  it('has a .loginFailure methods', () => {
    const error = {
      message: 'Invalid credentials',
      code: '10014',
    };

    expect(authOperations.loginFailure(error)).toMatchSnapshot();
  });

  it('has a .login methods', () => {
    const username = 'Storetail';
    const password = '1234567890';

    expect(authOperations.login(username, password)).toMatchSnapshot();
  });

  it('has a .alreadyLoggedIn methods', () => {
    expect(authOperations.alreadyLoggedIn()).toMatchSnapshot();
  });
});
