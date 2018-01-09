import React from 'react';
import shallow from 'enzyme/shallow';
import mount from 'enzyme/mount';
import configureStore from 'redux-mock-store';

import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import Router from '../Router';

const middlewares = [];
const mockStore = configureStore(middlewares);

const render = initialEntries =>
  mount(
    <MemoryRouter initialEntries={[initialEntries]}>
      <Provider store={mockStore({ auth: { login: {} } })}>
        <Router />
      </Provider>
    </MemoryRouter>
  );

describe('Router', () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', '1234567890');
  });

  it('renders App at /', () => {
    const tree = render('/');

    expect(tree.find('App')).toHaveLength(1);
  });

  it('renders Login at /login', () => {
    const tree = render('/login');

    expect(tree.find('LoginPage')).toHaveLength(1);
  });
});
