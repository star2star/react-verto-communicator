import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
//import ReactDOM from 'react-dom';
//import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import CallHistoryItem from '../components/callHistoryItem';

jest.unmock('../components/callHistoryItem');
jest.unmock('moment');

describe('<CallHistoryItem />', ()=>{
  const callHist1 = {
    callerId : 'KC Nichols',
    lastTimestamp : 1465580685964,
    nbrCalls : 5,
    lastDirection : 'incoming'
  };
  const callHist2 = {
    callerId : 'KC Nichols',
    lastTimestamp : 1465580685964,
    nbrCalls : 5,
    lastDirection : 'outgoing'
  };

  it('displays incoming icon if lastDirection is incoming', () => {
    const wrapper = shallow(<CallHistoryItem data={callHist1} />);
    const expectedNode = wrapper.children().first().find('.info').children().first().find('DownArrowIconSVG');
    //console.log(expectedNode.debug());
    expect(expectedNode.find('DownArrowIconSVG').length).toEqual(1);
  });

  it('displays outgoing icon if lastDirection is incoming', () => {
    const wrapper = shallow(<CallHistoryItem data={callHist2} />);
    const expectedNode = wrapper.children().first().find('.info').children().first();
    //console.log(expectedNode.debug());
    expect(expectedNode.find('UpArrowIconSVG').length).toEqual(1);
  });

  it('displays provided callerId', () => {
    const wrapper = shallow(<CallHistoryItem data={callHist1} />);
    const expectedNode = wrapper.children().first().find('.info').children().find('.callerId');
    //console.log(expectedNode.props().children);
    expect(expectedNode.props().children).toEqual('KC Nichols');
  });

  it('displays provided number of calls', () => {
    const wrapper = shallow(<CallHistoryItem data={callHist1} />);
    const expectedNode = wrapper.children().first().find('.info').children().find('.nbrCalls');
    //console.log(expectedNode);
    expect(expectedNode.props().children).toEqual([ '(', 5, ')' ]);
  });

  it('displays formatted timestamp', () => {
    const wrapper = shallow(<CallHistoryItem data={callHist1} />);
    const expectedNode = wrapper.children().first().find('.timestamp');
    //console.log(expectedNode.debug());
    expect(expectedNode.props().children).toEqual('Fri Jun 10 2016 13:44:45 PM');
  });

  it('displays menuIconSVG', () => {
    const wrapper = shallow(<CallHistoryItem data={callHist1} />);
    const expectedNode = wrapper.children().find('.menuCont');
    //console.log(expectedNode.debug());
    expect(expectedNode.find('MenuIconSVG').length).toEqual(1);
  });

  it('simulates click event (cbClick)', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CallHistoryItem data={callHist1} />);
    const expectedNode = wrapper.children().find('.top');
    //console.log(expectedNode.debug());
    expectedNode.simulate('click');
    expect(spy.calledOnce, true);
  });

  it('simulates click event (cbShowCalls)', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CallHistoryItem data={callHist1} />);
    const expectedNode = wrapper.children().find('.menuCont');
    //console.log(expectedNode.debug());
    expectedNode.simulate('click');
    expect(spy.calledOnce, true);
  });

});
