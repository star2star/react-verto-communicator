import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';
import Splash from '../components/splash.js';
jest.unmock('../components/splash.js');

describe('Splash Screen Component', ()=>{

  const SampleStep = {
    number: 4,
    current: 2,
    title: "Checking Media Permissions"
  };

  const SampleStep2 = {
    number: 4,
    current: 3,
    title: "Checking Connection Speed"
  };

  it('renders a given step', () => {
    const wrapper = mount(<Splash step={SampleStep} />);
    expect(wrapper.props().step).toEqual(SampleStep);
  });

  it('sets the correct width for the loading bar when 2 of 4 steps are completed.', ()=> {
    expect(Splash.getProgressBarWidth(SampleStep)).toEqual(50);
  });

  it('sets the correct width for the loading bar when 3 of 4 steps are completed.', ()=> {
    expect(Splash.getProgressBarWidth(SampleStep2)).toEqual(75);
  });

  it('uses the SplashMessage component', ()=> {
    const wrapper = mount(<Splash step={SampleStep2} />);
    expect(wrapper.find('SplashMessage').props().statusTitle).toEqual('Checking Connection Speed');
  });

});
