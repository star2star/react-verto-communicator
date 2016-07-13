import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import MemberList from '../components/memberList';
import MemberItem from '../components/memberItem';

jest.unmock('../components/memberList');
jest.unmock('../components/memberItem');
// jest.unmock('../helpers/intl-enzyme-test-helper.js');
// jest.unmock('../js/messages.js');
 jest.unmock('../components/svgIcons.js');

describe( 'MemberList', ()=>{

  const cbControlClick= sinon.spy();
  const controlSettings={ moderator: true, multCanvas: false, allowPresenter: true };
  const sampleMembers = [{
    callerId: "Name",
    codec: "opus@48000",
    memberId: "0000",
    name: "Name",
    avatar: {
      email: "Name@email.com",
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
  },
  {
    callerId: "1Name",
    codec: "opus@48000",
    memberId: "0000",
    name: "1Name",
    avatar: {
      email: "1Name@email.com",
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
        muted: true,
        onHold: false,
        talking: false
      }
    }
  }];

  it('renders a div', () => {
    const wrapper = shallow(
      <MemberList
          cbControlClick={cbControlClick}
          members={sampleMembers}
          controlSettings={controlSettings}
        />);
     expect(wrapper.find('div').length).toEqual(1);
  });

  it('Takes in & displays props correctly (name:)', () => {
    const wrapper = shallow(
      <MemberList
          cbControlClick={cbControlClick}
          members={sampleMembers}
          controlSettings={controlSettings}
        />);
        console.log(wrapper.props().children[0]);
    expect(wrapper.props().sampleMember.name).toEqual('Name');
  });

});
