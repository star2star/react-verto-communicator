//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';

import BrowserInfo from '../components/browserInfo.js';

 jest.unmock('../components/browserInfo.js');
 jest.unmock('../components/svgIcons.js');

describe('Browser Info Component', ()=>{

const browserData = {
  icon: 'ChromeBrowserIconSVG',
  name: 'Chrome',
  link: 'https://www.google.com/chrome/browser/desktop/',
  version: 'All'
}

  it('renders four <div> tags', () => {
    //expect(true).toBe(true);
     const wrapper = shallow(
       <BrowserInfo browserData={browserData} />);
     expect(wrapper.find('div').length).toEqual(4);
   });

   it('renders an <a> tag', () => {
     //expect(true).toBe(true);
      const wrapper = shallow(
        <BrowserInfo browserData={browserData} />);
      expect(wrapper.find('a').length).toEqual(1);
    });

   it('browserData not undefined', () => {
     //expect(true).toBe(true);
      const wrapper = shallow(<BrowserInfo browserData={browserData} />);
      expect(wrapper.props().browserData).toBeDefined;
   });

   it('does not render compStyle if not provided', () =>{
      const wrapper = shallow(<BrowserInfo browserData={browserData} />);
      expect(wrapper.prop('compStyle')).toEqual(undefined);
    });

  it('renders if bnsInfoStyle is provided', () => {
    const wrapper = shallow(<BrowserInfo browserData={browserData} bnsInfoStyle={{display: 'inline-block', width: '11rem', textAlign: 'center'}} />)
    expect(wrapper.prop('style')).toEqual({display: 'inline-block', width: '11rem', textAlign: 'center'});
  });



});
