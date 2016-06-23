import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
//import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import CallHistory from '../components/callhistory';

jest.unmock('../components/callhistory');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
jest.unmock('moment');
jest.unmock('../js/callHistoryService.js');

describe('<CallHistory />', ()=>{
  const history = [{
    callerId : 'KC Nichols',
    lastTimestamp : 1465580685964,
    nbrCalls : 5,
    lastDirection : 'incoming'
  },
  {
    callerId : 'KC Nichols',
    lastTimestamp : 1465580685964,
    nbrCalls : 5,
    lastDirection : 'outgoing'
  }];

  const emptyHistory = [];

  const func = function() {
    return 'Click Simulated';
  };

  it('renders CallHistoryItems if callDetailDisplayed is false and history length is greater than zero', () => {
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    const expectedNode = wrapper.children().find('.body');
    //console.log(expectedNode.debug());
    expect(expectedNode.children().find('CallHistoryItem').length).toEqual(2);
  });

  it('renders .noCalls div if callDetailDisplayed is false and history length is zero', () => {
    const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
    const expectedNode = wrapper.children().find('.body');
    //console.log(expectedNode.debug());
    expect(expectedNode.children().find('.noCalls').length).toEqual(1);
  });

  it('renders localized header title', () => {
    const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
    const expectedNode = wrapper.children().find('.header').children().find('.title').children();
    //console.log(expectedNode.props());
    expect(expectedNode.prop('id')).toEqual('CALL_HISTORY');
  });

  // it('renders incoming svg', () => {
  //   const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
  //   const expectedNode = wrapper.children().find('.body');
  //   //console.log(expectedNode.debug());
  //   //expect(expectedNode.children().find('.noCalls').length).toEqual(1);
  // });
  //
  // it('renders outgoing svg', () => {
  //   const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
  //   const expectedNode = wrapper.children().find('.body');
  //   //console.log(expectedNode.debug());
  //   //expect(expectedNode.children().find('.noCalls').length).toEqual(1);
  // });

  // Error: "localStorage is not defined"
    // it('renders CallHistoryItems if callDetailDisplayed is true and history length is greater than zero', () => {
    //   const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    //   wrapper.setState({ callDetailDisplayed: true });
    //   const expectedNode = wrapper.children().find('.detailBody');
    //   console.log(expectedNode.debug());
    //   //expect(expectedNode.children().find('CallHistoryItem').length).toEqual(2);
    // });


});
