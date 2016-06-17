//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
//import TestUtils from 'react-addons-test-utils';

import VCStatus from '../components/vcstatus.js';

 jest.unmock('../components/vcstatus.js');
 jest.unmock('../components/svgIcons.js');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('../js/messages.js');
 jest.unmock('moment');

describe('Verto Comm Status Component', ()=>{
  /*
  it('renders <svg> tag', () => {
    //expect(true).toBe(true);
     const wrapper = shallowWithIntl(<VCStatus status='disconnected' />);
     expect(wrapper.find('StatusIconSVG').length).toEqual(1);
  },);

  it('renders correct icon color if disconnected', () => {
    const wrapper = shallowWithIntl(<VCStatus status='disconnected' />);
    expect(wrapper.find('StatusIconSVG').props().svgStyle.fill).toEqual("#F45A5A");
  },);

  it('renders correct icon color if connected', () => {
    const wrapper = shallowWithIntl(<VCStatus status='connected' />);
    expect(wrapper.find('StatusIconSVG').props().svgStyle.fill).toEqual("#4ACF55");
  },);

  it('renders correct icon color if connecting', () => {
    const wrapper = shallowWithIntl(<VCStatus status='connecting' />);
    expect(wrapper.find('StatusIconSVG').props().svgStyle.fill).toEqual("#F7D965");
  },);

  it('renders the red icon if an unrecognized  status is enter', () => {
    const wrapper = shallowWithIntl(<VCStatus status='Logged-On' />);
    expect(wrapper.find('StatusIconSVG').props().svgStyle.fill).toEqual("#F45A5A");

  });
*/



  //TODO add more tests...
});
