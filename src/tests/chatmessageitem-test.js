import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import ChatMessageItem from '../components/chatMessageItem';
import moment from 'moment';

jest.unmock('../components/chatMessageItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
jest.unmock('moment');

describe('Default test for ChatMessageItem', ()=>{

  const sampleData = {
    bgColor: "#FFFFFF",
    callID: "1f898d4d-07dd-0988-0436-d65298735c0e",
    displayName: "Cory",
    isMe: true,
    message:"Hi",
    utc_timestamp: 1465846699477
  };

  it('renders the correct timestamp ', () => {
    const wrapper = shallow(<ChatMessageItem message={sampleData} />);
    //console.log(wrapper.childAt(1).childAt(2).props().children[2]);
    expect(wrapper.childAt(1).childAt(2).props().children[2]);
  });

  it('renders the correct username ', () => {
    const wrapper = shallow(<ChatMessageItem message={sampleData} />);
    //console.log(wrapper.childAt(1).childAt(2).props().children[2]);
    expect(wrapper.childAt(1).childAt(2).props().children[0]).toEqual('Cory');
  });


});
