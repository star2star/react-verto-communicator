// <<componentName>>/__tests__/index-js

//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
jest.unmock('../src/index.jsx');
// jest.unmock('../node_modules/sinon');

import ReactDOM from 'react-dom';
import <<componentName>> from '../src/index.jsx';


describe('<<ComponentName>> Component', ()=>{
  it('renders imgSrc prop if provided', () => {

  const wrapper = shallow(< <<ComponentName>> imgSrc="test.png" />);
  expect(wrapper.find('img').node.props.src).toEqual("test.png");
  });

});
