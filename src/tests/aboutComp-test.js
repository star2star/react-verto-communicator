import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';

import About from '../components/about.js';

jest.unmock('../components/about.js');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('<About />', ()=>{
  it('renders SignalFullIconSVG if network data is considered good', () => {
     const wrapper = shallowWithIntl(<About />);
     expect(wrapper.find('SignalFullIconSVG').length).toEqual(1);
  });
});
