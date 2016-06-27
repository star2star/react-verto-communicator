import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AdminControls from '../components/memberAdminControlPanel';
//import moment from 'moment';

jest.unmock('../components/memberAdminControlPanel');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
//jest.unmock('moment');

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
    video: {
      avatarPresented:false,
      floor:true,
      mediaFlow:"sendRecv",
      muted:true,
      reservationID:null,
      videoLayerID:0,
      videoOnly:false,
      visible:false
    },
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

//for some reason I can't find the ControlItems so I have to just look for some lame divs....
  it('Renders the correct amount of SVGs when there is only one canvas', () => {
    const wrapper = mountWithIntl(<AdminControls multCanvas={false} member={sampleMember}  cbControlClick={()=>{}} />);
    expect(wrapper.find('div').length).toEqual(16);
  });

  it('Renders the correct amount of SVGs when there are multiple canvases ', () => {
    const wrapper = mountWithIntl(<AdminControls multCanvas={true} member={sampleMember}  cbControlClick={()=>{}} />);
    expect(wrapper.find('div').length).toEqual(21);
  });

  it('Properly takes in the props ', () => {
    const wrapper = mountWithIntl(<AdminControls multCanvas={true} member={sampleMember}  cbControlClick={()=>{}} />);
    expect(wrapper.props().multCanvas).toEqual(true);
  });

  it('Properly takes in the props ', () => {
    const wrapper = mountWithIntl(<AdminControls multCanvas={true} member={sampleMember}  cbControlClick={()=>{}} />);
    expect(wrapper.props().member.name).toEqual('Cory');
  });

});
