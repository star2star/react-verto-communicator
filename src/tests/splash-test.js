import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';
import Splash from '../components/splash.js';
jest.unmock('../components/splash.js');

describe('Splash Screen Component', ()=>{

  const SampleStep = {
    number: "4",
    current: "2",
    title: "Checking Media Permissions"
  };

  it('renders a given step', () => {
    const wrapper = mount(<Splash step={SampleStep} />);
    expect(wrapper.props().step).toEqual(SampleStep);
  });

  it('fills the loading bar correctly', ()=> {

    expect(Splash.getProgressBarWidth(SampleStep)).toEqual(60);
  });

});
