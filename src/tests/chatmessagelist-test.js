import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import ChatMessageList from '../components/chatMessageList';
import moment from 'moment';

jest.unmock('../components/chatMessageList');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
jest.unmock('moment');

describe('Default test for ChatMessageList', ()=>{


  const itemsSample = [{
    bgColor: "#FFFFFF",
    callID: "1f898d4d-07dd-0988-0436-d65298735c0e",
    displayName: "Cory",
    isMe: true,
    message:"Hi",
    utc_timestamp: 1465846699477
  }];

  const usersSample = {
    avatar: {
      avatar: "http://gravatar.com/avatar/2456ab4d05ef8d750b6d7492839e32d7.png?s=75",
      email: "Cory@schimmoeller.net"
    },
    callerId: "Cory",
    codec: "opus@48000",
    conferenceStatus: {
      memberId: "0361",
      name: "Cory"
    }
  };
/*
  it('does thing ', () => {
    const wrapper = shallow(<ChatMessageList chatUsers={usersSample} chatItems={itemsSample} />);
    expect(wrapper.childAt(1).childAt(2).props().children[2]).toEqual('Today at 3:38 PM');
  });

*/



});
