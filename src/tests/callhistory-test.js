import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
//import ReactDOM from 'react-dom';
//import CallHistoryService from '../js/callHistoryService';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import CallHistory from '../components/callhistory';

jest.unmock('../components/callHistory');
jest.unmock('../components/callHistoryItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
jest.unmock('moment');
jest.unmock('../js/callHistoryService.js');
//jest.unmock('../components/tooltip.js');

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

  it('displays a list of objects containing call history objects', () => {
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    const historyItems = wrapper.children().find('.body');
    //console.log(historyItems.debug());
    expect(historyItems.children().find('CallHistoryItem').length).toEqual(2);
  });
/*
  it('renders .noCalls div if callDetailDisplayed is false and history length is zero', () => {
    const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
    const body = wrapper.children().find('.body');
    //console.log(expectedNode.debug());
    expect(body.children().find('.noCalls').length).toEqual(1);
  });

  it('renders .noCalls div if callDetailDisplayed is false and history length is zero', () => {
    const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
    const expectedNode = wrapper.children().find('.body');
    //console.log(expectedNode.debug());
    expect(expectedNode.children().find('.noCalls').length).toEqual(1);
  });

  it('displays a list of timestamps when state is changed', () => {
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    wrapper.setState({currItem: 1});
    const historyDetails = wrapper.children().find('.body-de');
    //console.log(historyDetails.debug());
    expect(historyDetails.length).toEqual(1);
  });

  it('clear history link exists in default state', () => {
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    const clearHistory = wrapper.children().find('.header-li').children().find('.rmvHistory');
    //console.log(clearHistory.debug());

    expect(clearHistory.length).toEqual(1);
  });

  it('clear history link does not exist in alternate state', () => {
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    const clearHistory = wrapper.children().find('.header-de').children().find('.rmvHistory');
    //console.log(clearHistory.debug());

    expect(clearHistory.length).toEqual(0);
  });

  it('simulates a click when cbClearHistory is clicked.', () => {
    const onClickStub = sinon.spy();
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    const clearHistory = wrapper.children().find('.header-li').children().find('.rmvHistory');
    //console.log(clearHistory.debug());

    clearHistory.simulate('click');
    expect(onClickStub.calledOnce, true);
  });

  it('cbBack is invoked when x svg is clicked.', () => {
    const onClickStub = sinon.spy();
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    const back = wrapper.children().find('.back');
    //console.log(back.debug());

    back.simulate('click');
    expect(onClickStub.calledOnce, true);
  });

  it('renders incoming svg', () => {
    const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
    const body = wrapper.children().find('.body');
    //console.log(body.debug());
    expect(body.children().find('.noCalls').length).toEqual(1);
  });

  it('renders outgoing svg', () => {
    const wrapper = mountWithIntl(<CallHistory history={emptyHistory} cbBack={func} cbClearHistory={func} />);
    const body = wrapper.children().find('.body');
    //console.log(body.debug());
    expect(body.children().find('.noCalls').length).toEqual(1);
  });


  it('displays Call History in the header when state is normal.', () => {
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    wrapper.setState({currItem: 1});
    const title = wrapper.children().find('.title').children().first();
    //console.log(title.debug());
    expect(title.text()).toEqual('Call History');
  });

  // ISSUE: .title-de not rendering children
  it('displays callerId in the header when in alternate state.', () => {
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} callerId="3500" cbClearHistory={func} />);
    const title = wrapper.children().find('.title-de');
    //console.log(title.debug());
    //console.log(wrapper.props());
    //expect(title.text()).notToEqual('Call History');
  });


  it('cbClick is invoked when x svg is clicked.', () => {
    const onClickStub = sinon.spy();
    const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    const back = wrapper.children().find('.back');
    //console.log(back.debug());

    back.simulate('click');
    expect(onClickStub.calledOnce, true);
  });


      // Need to solve details/callerid issue
  // it('displays callerId in the header when state is changed.', () => {
  //   const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
  //   //wrapper.setState({currItem: 1});
  //   const title = wrapper.children().find('.title-de');
  //   console.log(title.debug());
  //   expect(title.length).toEqual(1);
  // });

  // Error: "localStorage is not defined"
    // it('renders CallHistoryItems if callDetailDisplayed is true and history length is greater than zero', () => {
    //   const wrapper = mountWithIntl(<CallHistory history={history} cbBack={func} cbClearHistory={func} />);
    //   wrapper.setState({ callDetailDisplayed: true });
    //   const expectedNode = wrapper.children().find('.detailBody');
    //   console.log(expectedNode.debug());
    //   //expect(expectedNode.children().find('CallHistoryItem').length).toEqual(2);
    // });
*/

});
