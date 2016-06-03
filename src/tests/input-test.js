//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import Input from '../components/input.js';

//jest.unmock('../components/index.js');
//jest.unmock('../containers/appbar/index.js');
jest.unmock('../main.js');

describe('<Input />', ()=>{
  const label = "Name";
  const placeHolder = "Your Name";
  const value = "Harry";


  it('it displays a label', () => {
    const wrapper = mountWithIntl(<Input label={label} placeholder={placeHolder} value={value} />);
    console.log('%%%%%%%%%%%%%%%%%%%%', wrapper);
    //expect(wrapper.props().networkData).toEqual(sampleData);

  });

  it('it displays a label', () => {
    //const wrapper = mountWithIntl(<Input />);
    //expect(wrapper.props().networkData).toEqual(sampleData);

  });

});
