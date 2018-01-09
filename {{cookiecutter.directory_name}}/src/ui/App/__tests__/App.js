import React from 'react';
import shallow from 'enzyme/shallow';

import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const tree = shallow(<App />)

    expect(tree).toMatchSnapshot();
  })
});
