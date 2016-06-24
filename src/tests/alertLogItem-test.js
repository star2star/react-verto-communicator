import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AlertLogItem from '../components/alertLogItem';
import ControlItem from '../components/controlItem';
import moment from 'moment';

jest.unmock('../components/controlItem');
jest.unmock('../components/alertLogItem');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('moment');
 jest.unmock('../js/messages.js');

describe('Default test for AlertLog', ()=>{

  const cbRemoveAlert = sinon.spy();
  const sampleData = {
    level:"warn",
    timestamp:1466703201123,
    summary: "Can't hang up while sharing screen",
    detail: "You must stop sharing your screen before you can hangup the call",
    id: 0
  };
  const sampleKey = {
      id: 0
  };
  const errorData = {
    level:"error",
    timestamp:1466703201123,
    summary: "Can't hang up while sharing screen",
    detail: "You must stop sharing your screen before you can hangup the call",
    id: 0
  };
  const infoData = {
    level:"info",
    timestamp:1466703201123,
    summary: "Can't hang up while sharing screen",
    detail: "You must stop sharing your screen before you can hangup the call",
    id: 0
  };


  it('renders 5 divs', () => {
    const wrapper = mountWithIntl(
      <AlertLogItem
          key={sampleKey}
          alertData={sampleData}
          cbRemoveAlert={cbRemoveAlert}
      />);
     expect(wrapper.find('div').length).toEqual(5);
  });

  it('simulates click event (cbRemoveAlert)', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <AlertLogItem
          key={sampleKey}
          alertData={sampleData}
          cbRemoveAlert={cbRemoveAlert}
      />);
    const expectedNode = wrapper.children().find('.tab');
    //console.log(expectedNode.debug());
    expectedNode.simulate('click');
    expect(spy.calledOnce, true);
  });

  it('displays RemoveIconSVG', () => {
    const wrapper = mountWithIntl(
      <AlertLogItem
          key={sampleKey}
          alertData={sampleData}
          cbRemoveAlert={cbRemoveAlert}
      />);
    expect(wrapper.find('RemoveIconSVG').length).toEqual(1);
  });

  it('displays formatted timestamp', () => {
    const wrapper = shallowWithIntl(
      <AlertLogItem
          key={sampleKey}
          alertData={sampleData}
          cbRemoveAlert={cbRemoveAlert}
      />);
    const expectedNode = wrapper.children().find('.timestamp');
    // console.log('------------->>>', wrapper.children().find('.timestamp'));
    expect(expectedNode.props().children).toEqual('Thu Jun 23 2016 13:33:21 PM');
  });

  it('displays summary', () => {
    const wrapper = shallowWithIntl(
      <AlertLogItem
          key={sampleKey}
          alertData={sampleData}
          cbRemoveAlert={cbRemoveAlert}
      />);
    const expectedNode = wrapper.children().find('.summary');
    // console.log('------------->>>', wrapper.children().find('.summary'));
    expect(expectedNode.props().children).toEqual("Can't hang up while sharing screen");
  });

    it('displays detail', () => {
      const wrapper = shallowWithIntl(
        <AlertLogItem
            key={sampleKey}
            alertData={sampleData}
            cbRemoveAlert={cbRemoveAlert}
        />);
      const expectedNode = wrapper.children().find('.detail');
      // console.log('------------->>>', wrapper.children().find('.detail'));
      expect(expectedNode.props().children).toEqual("You must stop sharing your screen before you can hangup the call");
    });

    it('displays correct header color based on level(warn/yellow)', () => {
      const wrapper = mountWithIntl(
        <AlertLogItem
            key={sampleKey}
            alertData={sampleData}
            cbRemoveAlert={cbRemoveAlert}
        />);
      // console.log('------------->>>', wrapper.childAt(0).props());
     expect(wrapper.childAt(0).props().style.backgroundColor ).toEqual('#FFC02F');
    });

    it('displays correct header color based on level(error/red)', () => {
      const wrapper = mountWithIntl(
        <AlertLogItem
            key={sampleKey}
            alertData={errorData}
            cbRemoveAlert={cbRemoveAlert}
        />);
     expect(wrapper.childAt(0).props().style.backgroundColor ).toEqual('#FD5F56');
    });

    it('displays correct header color based on level(info/green)', () => {
      const wrapper = mountWithIntl(
        <AlertLogItem
            key={sampleKey}
            alertData={infoData}
            cbRemoveAlert={cbRemoveAlert}
        />);
     expect(wrapper.childAt(0).props().style.backgroundColor ).toEqual('#63B653');
    });

});
