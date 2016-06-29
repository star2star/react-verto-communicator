import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import ControlItem from '../components/controlItem';

jest.unmock('../components/controlItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('../components/svgIcons.js');

describe('Default test for ControlItem', ()=>{
  const cbActionClick = sinon.spy();
  const label = "label"

  it('renders two spans', () => {
    const wrapper = shallow(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
      />);
     expect(wrapper.find('span').length).toEqual(2);
  });

  it('renders the SVG ', () => {
    const wrapper = mount(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
      />);
       expect(wrapper.find('RemoveIconSVG').length).toEqual(1);
  });

  it('renders correct style', () => {
    const wrapper = shallow(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
        />);
    //  console.log('------------>>', wrapper.props().style.display);
    expect(wrapper.props().style.display).toEqual('flex');
  });

  it('renders correct style', () => {
    const wrapper = shallow(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
        />);
    //  console.log('------------>>', wrapper.childAt(0).props().svgStyle.height);
    expect(wrapper.childAt(0).props().svgStyle.height).toEqual('24px');
  });

  it('renders correct style', () => {
    const wrapper = shallow(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
        />);
    //  console.log('------------>>', wrapper.childAt(0).props().svgStyle.height);
    expect(wrapper.childAt(0).props().svgStyle.fill).toEqual('#6b6c6c');
  });

  it('displays label', () => {
    const wrapper = mount(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
          label={label}
        />);
    const expectedNode = wrapper.children().find('.label');
    // console.log('------------->>>', wrapper.children().find('.label'));
    expect(expectedNode.props().children).toEqual("label");
  });

  it('simulates click event (cbActionClick)', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
          label={label}
      />);
    const expectedNode = wrapper.find('.container');
    // console.log('------->>>', expectedNode.debug());
    expectedNode.simulate('click');
    expect(spy.calledOnce, true);
  });


});
