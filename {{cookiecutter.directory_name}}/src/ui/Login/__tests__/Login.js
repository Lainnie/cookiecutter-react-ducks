import React from 'react';
import shallow from 'enzyme/shallow';

import { LoginPage as Login } from '../Login';

describe('Login', () => {
  it('renders correctly', () => {
    const tree = shallow(<Login />).dive();

    expect(tree).toMatchSnapshot();
  });

  describe('when submitting form', () => {
    const login = jest.fn();

    it('calls authOperations.login with usermame and password', () => {
      const tree = shallow(<Login login={login} />);
      const instance = tree.instance();

      instance.onSubmit({ username: 'username', password: 'password' });

      expect(login).toHaveBeenCalledWith('username', 'password');
    });
  });
});
