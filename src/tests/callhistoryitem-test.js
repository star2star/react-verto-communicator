import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import CallHistoryItem from '../components/callhistoryitem';

jest.unmock('../components/callhistoryitem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for contributorsListItem', ()=>{
const callHist = {
  callerId : 'KC Nichols',
  lastTimestamp : '',
  nbrCalls : 5,
  lastDirection : 'outbound'
};

});
