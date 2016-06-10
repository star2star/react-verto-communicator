import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
//import ReactDOM from 'react-dom';
//import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import CallHistory from '../components/callhistory';

jest.unmock('../components/callhistory');
jest.unmock('moment');

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

  const func = function() {
    return 'Click Simulated';
  };

  it('does anything', () => {
    const wrapper = shallow(<CallHistory history={history} cbBack={func} />);
    console.log(wrapper.debug());
    //expect(expectedNode.find('DownArrowIconSVG').length).toEqual(1);
  });

});
