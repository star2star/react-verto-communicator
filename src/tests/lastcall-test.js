import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import LastCall from '../components/lastCall.js';

jest.unmock('../components/lastCall.js');

describe('LastCall', ()=>{

  it('properly takes in a phone number', () => {
    const wrapper = mount(<LastCall labelText="last call: " lastNumber="867-5309"/>);
    //console.log(wrapper.props().lastNumber);
    expect(wrapper.props().lastNumber).toEqual("867-5309");
  });

  it('properly takes in a label', () => {
    const wrapper = mount(<LastCall labelText="In Call: " lastNumber="1-800-255-3700"/>);
    expect(wrapper.props().labelText).toEqual("In Call: ");
  });

});
