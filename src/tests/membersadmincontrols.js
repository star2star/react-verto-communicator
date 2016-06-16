import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AdminControls from '../components/memberAdminControlPanel';
import moment from 'moment';

jest.unmock('../components/memberAdminControlPanel');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
jest.unmock('moment');

const sampleMember = {
  callerId: "Cory",
  codec: "opus@48000",
  memberId: "0000",
  name: "Cory",
  avatar: {
    email: "Cory@schimmoeller.net",
    avatar: "http://gravatar.com/avatar/2456ab4d05ef8d750b6d7492839e32d7.png?s=75"
  },
  conferenceStatus: {
    oldStatus: "floor",
    video: false,
    audio: {
      energyScore:515,
      floor: true,
      muted: false,
      onHold: false,
      talking: false
    }
  }
};

describe('Default test for ChatMessageItem', ()=>{


  it('some dumb test to show off this error ', () => {
    const wrapper = mountWithIntl(<AdminControls multCanvas={false} member={sampleMember}  cbControlClick={()=>{}} />);
    expect(wrapper.find('div')).toEqual(3);
  });

});
