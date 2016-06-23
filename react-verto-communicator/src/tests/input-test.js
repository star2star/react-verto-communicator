//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import Input from '../components/input.js';

jest.unmock('../components/input.js');

describe('<Input />', ()=>{
  const label = "Name";
  const placeHolder = "Your Name";
  const value = "Harry";
  const typ = "password";

  it('displays a label', () => {
    const wrapper = mount(<Input label={label} placeholder={placeHolder} value={value} type={typ} />);
    //console.log('%%%%%%%%%%%%%%%%%%%%', wrapper.get(0).props.label);
    expect(wrapper.get(0).props.label).toEqual(label);
  });

  it('displays a placeholder', () => {
    const wrapper = mount(<Input label={label} placeholder={placeHolder} value={value} type={typ} />);
    expect(wrapper.get(0).props.placeholder).toEqual(placeHolder);
  });

  it('displays a type', () => {
    const wrapper = mount(<Input label={label} placeholder={placeHolder} value={value} type={typ} />);
    expect(wrapper.get(0).props.type).toEqual(typ);
  });

  it('displays a value', () => {
    const wrapper = mount(<Input label={label} placeholder={placeHolder} value={value} type={typ} />);
    expect(wrapper.get(0).props.value).toEqual(value);
  });

});
