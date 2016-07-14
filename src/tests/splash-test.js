import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {StyleRoot} from 'radium';
import Splash from '../components/splash.js';
jest.unmock('../components/splash.js');


describe('Splash Screen Component', ()=>{

  const sampleStep = {
    number: 4,
    current: 2,
    title: "Checking Media Permissions"
  };

  const sampleStep2 = {
    number: 4,
    current: 3,
    title: "Checking Connection Speed"
  };

  it('renders a given step', () => {
    const wrapper = mount(<StyleRoot><Splash step={sampleStep} /></StyleRoot>);
    expect(wrapper.props().step).toEqual(undefined);
  });

  it('sets the correct width for the loading bar when 2 of 4 steps are completed.', ()=> {
    expect(Splash.getProgressBarWidth(sampleStep)).toEqual(50);
  });

  it('sets the correct width for the loading bar when 3 of 4 steps are completed.', ()=> {
    expect(Splash.getProgressBarWidth(sampleStep2)).toEqual(75);
  });

  it('uses the SplashMessage component', ()=> {
    const wrapper = mount(<StyleRoot><Splash step={sampleStep} /></StyleRoot>);
    expect(wrapper.find('SplashMessage').props().statusTitle).toEqual('Checking Media Permissions');
  });

});
