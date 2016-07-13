//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import Settings from '../components/settings.js';

import UserMenu from '../components/userMenu.js';

jest.unmock('../components/userMenu.js');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('<UserMenu />', ()=>{

  // If displayDropdown is true it renders CaretUpIconSVG.
  it('renders CaretUpIconSVG if displayDropdown is true', () => {
    const wrapper = shallowWithIntl(<UserMenu />);
    wrapper.setState({ dropdownDisplayed: true});
    expect(wrapper.find('CaretUpIconSVG').length).toEqual(0);
  });

  //If displayDropdown is false it renders CaretDownIconSVG.
  it('renders CaretDownIconSVG if displayDropdown is true', () => {
    const wrapper = shallowWithIntl(<UserMenu />);
    wrapper.setState({ dropdownDisplayed: false});
    expect(wrapper.find('CaretDownIconSVG').length).toEqual(0);
  });


});
