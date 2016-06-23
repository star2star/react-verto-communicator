//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';

import Numberitem from '../components/numberitem.js';

jest.unmock('../components/numberitem.js');
// jest.unmock('../helpers/intl-enzyme-test-helper.js');
// jest.unmock('../js/messages.js');

describe('<Numberitem />', ()=>{
  const cbTest = sinon.spy();

  // networkData prop is provided.
  it('renders keyValue', () => {
    const wrapper = mount(<Numberitem keyValue="3" keyString="DEF"  cbClick={cbTest}/>);
    //console.log('**********************', wrapper.props());
    expect(wrapper.props().keyValue).toEqual('3');

  });

  it('renders keyString', () => {
    const wrapper = mount(<Numberitem keyValue="3" keyString="DEF"  cbClick={cbTest}/>);
    //console.log('**********************', wrapper.children());
    expect(wrapper.props().keyString).toEqual('DEF');

  });

  //TODO: figure out why click tests aren't working
  it('Click event fires callback function', () => {
    const wrapper = shallow(<Numberitem cbClick={cbTest} />);
    wrapper.simulate('click');
    expect(cbTest.calledOnce).toEqual(true);

  });


});
