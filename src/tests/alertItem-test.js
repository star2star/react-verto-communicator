import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AlertItem from '../components/alertItem';
import ControlItem from '../components/controlItem';

jest.unmock('../components/alertItem');
jest.unmock('../components/controlItem');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');


describe('Default test for AlertItem', ()=>{

  const cbDismissAlert = sinon.spy();
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


  it('renders 3 divs', () => {
    const wrapper = shallowWithIntl(
      <AlertItem
          key={sampleKey}
          alertData={sampleData}
          cbDismissAlert={cbDismissAlert}
       />);
     expect(wrapper.find('div').length).toEqual(3);
  });

  it('simulates click event (cbDismissAlert)', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <AlertItem
          key={sampleKey}
          alertData={sampleData}
          cbDismissAlert={cbDismissAlert}
      />);
    const expectedNode = wrapper.children().find('.summary');
    //console.log(expectedNode.debug());
    expectedNode.simulate('click');
    expect(spy.calledOnce, true);
  });

    it('displays RemoveIconSVG', () => {
      const wrapper = mountWithIntl(
        <AlertItem
            key={sampleKey}
            alertData={sampleData}
            cbDismissAlert={cbDismissAlert}
        />);
      expect(wrapper.find('RemoveIconSVG').length).toEqual(1);
    });


    it('displays detail', () => {
      const wrapper = shallowWithIntl(
        <AlertItem
            key={sampleKey}
            alertData={sampleData}
            cbDismissAlert={cbDismissAlert}
        />);
      const expectedNode = wrapper.children().find('.detail');
      // console.log('------------->>>', wrapper.children().find('.detail'));
      expect(expectedNode.props().children).toEqual("You must stop sharing your screen before you can hangup the call");
    });


  it('displays summary', () => {
    const wrapper = shallowWithIntl(
      <AlertItem
          key={sampleKey}
          alertData={sampleData}
          cbDismissAlert={cbDismissAlert}
      />);
    const expectedNode = wrapper.children().find('.summary');
    // console.log('------------->>>', wrapper.children().find('.summary'));
    expect(expectedNode.props().children[0]).toEqual("Can't hang up while sharing screen");
  });

  it('displays correct header color based on level(warn/yellow)', () => {
    const wrapper = mountWithIntl(
      <AlertItem
          key={sampleKey}
          alertData={sampleData}
          cbDismissAlert={cbDismissAlert}
      />);
    // console.log('------------->>>', wrapper.childAt(0).props());
   expect(wrapper.childAt(0).props().style.backgroundColor ).toEqual('#FFC02F');
  });

  it('displays correct header color based on level(error/red)', () => {
    const wrapper = mountWithIntl(
      <AlertItem
          key={sampleKey}
          alertData={errorData}
          cbDismissAlert={cbDismissAlert}
      />);
   expect(wrapper.childAt(0).props().style.backgroundColor ).toEqual('#FD5F56');
  });

  it('displays correct header color based on level(info/green)', () => {
    const wrapper = mountWithIntl(
      <AlertItem
          key={sampleKey}
          alertData={infoData}
          cbDismissAlert={cbDismissAlert}
      />);
   expect(wrapper.childAt(0).props().style.backgroundColor ).toEqual('#63B653');
  });



});
