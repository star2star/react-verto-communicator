//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';
import SplashMessage from '../components/splashmessage.js';

  jest.unmock('../components/splashmessage.js');

describe('Splash Screen Message Component', ()=>{

  it('renders 2 <div> tags if errorObject is not passed into it', () => {
    //expect(true).toBe(true);
     const wrapper = shallow(
       <SplashMessage statusTitle='Checking Media Permissions' />);
     expect(wrapper.find('div').length).toEqual(2 );
   });

   it('renders 5 <div> tags if  errorObject is passed into it', () => {
     //expect(true).toBe(true);
      const wrapper = shallow(
        <SplashMessage statusTitle='Checking Media Permissions' errorObject={{header: 'Error', body: 'You media permissions are turned off.'}} />);
      expect(wrapper.find('div').length).toEqual(5);
  });

//end of the tests
});
