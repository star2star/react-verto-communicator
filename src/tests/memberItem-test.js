import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import MemberItem from '../components/memberItem';

jest.unmock('../components/memberItem');
 jest.unmock('../components/svgIcons.js');

describe('Default test for MemberItem', ()=>{

  const cbControlClick = sinon.spy();
  const controlSettings = { moderator: true, multCanvas: false, allowPresenter: true }
  const sampleMember = {
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
  };


  it('renders 4 divs', () => {
    const wrapper = shallow(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
      />);
     expect(wrapper.find('div').length).toEqual(4);
  });

  it('Click event fires callback function', () => {
    const wrapper = shallow(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
      />);
      wrapper.simulate('click');
    expect(cbControlClick.calledOnce).toEqual(true);
  });

  it('renders MuteMicrophoneIconSVG', () => {
    const wrapper = shallow(
      <MemberItem
        member={sampleMember}
        controlSettings={controlSettings}
        cbControlClick={cbControlClick}
    />);
    wrapper.setState({ dropdownDisplayed: true});
    expect(wrapper.find('MicrophoneIconSVG').length).toEqual(1);
  });

  it('Properly takes in the props ', () => {
    const wrapper = shallow(
      <MemberItem
        member={sampleMember}
        controlSettings={controlSettings}
        cbControlClick={cbControlClick}
    />);
    expect(wrapper.props().sampleMember.name).toEqual('Name');
});

});
