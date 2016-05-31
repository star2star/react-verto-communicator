//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';

import UserMenu from '../components/userMenu.js';

jest.unmock('../components/userMenu.js');

describe('<UserMenu />', ()=>{

  // If displayDropdown is true it renders CaretUpIconSVG.
  it('renders CaretUpIconSVG if displayDropdown is true', () => {
    const wrapper = shallow(<UserMenu />);
    wrapper.setState({ dropdownDisplayed: true});
    expect(wrapper.find('CaretUpIconSVG').length).toEqual(1);
  });

  //If displayDropdown is false it renders CaretDownIconSVG.
  it('renders CaretDownIconSVG if displayDropdown is true', () => {
    const wrapper = shallow(<UserMenu />);
    wrapper.setState({ dropdownDisplayed: false});
    expect(wrapper.find('CaretDownIconSVG').length).toEqual(1);
  });

  //If displayDropdown is true menu display style renders as 'flex'
  it('renders display: flex if displayDropdown is true', () => {
    const wrapper = shallow(<UserMenu />);
    wrapper.setState({ dropdownDisplayed: true});
    //console.log(wrapper.childAt(2).props().style.display);
    expect(wrapper.childAt(2).props().style.display).toEqual('flex');
  });

  //If displayDropdown is false menu display style renders as 'none'
  it('renders display: none if displayDropdown is true', () => {
    const wrapper = shallow(<UserMenu />);
    wrapper.setState({ dropdownDisplayed: false});
    expect(wrapper.childAt(2).props().style.display).toEqual('none');
  });

});
