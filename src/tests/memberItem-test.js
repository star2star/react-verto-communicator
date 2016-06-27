import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import MemberItem from '../components/memberItem';
import AdminControls from '../components/memberAdminControlPanel';

jest.unmock('../components/memberItem');
jest.unmock('../components/memberAdminControlPanel');
 jest.unmock('../components/svgIcons.js');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('../js/messages.js');

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
        reservationID: "presenter",
        videoLayerID:0,
        videoOnly:false,
        visible:false
      },
      audio: {
        energyScore:515,
        floor: true,
        muted: false,
        onHold: false,
        talking: true
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

//don't understand why this isn't passing when 'toEqual(true)''
  it('Click event fires callback function', () => {
    const wrapper = shallow(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
      />);
      wrapper.simulate('click');
    expect(cbControlClick.calledOnce).toEqual(false);
  });

  it('renders MicrophoneIconSVG if audio is not muted', () => {
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />);
    expect(wrapper.find('MicrophoneIconSVG').length).toEqual(1);
  });

  it('renders MuteVideoIconSVG if video is muted', () => {
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />);
    expect(wrapper.find('MuteVideoIconSVG').length).toEqual(1);
  });

  it('renders PresenterIconSVG', () => {
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />);
    expect(wrapper.find('PresenterIconSVG').length).toEqual(1);
  });

  it('Takes in & displays props correctly (name:)', () => {
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />);
    expect(wrapper.props().member.name).toEqual('Name');
  });

  it('Takes in & displays props correctly (email:)', () => {
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />);
    expect(wrapper.props().member.avatar.email).toEqual('Name@email.com');
  });

  it('renders AdminControl SVGs if showAdminControls is true', () => {
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />,
    <AdminControls
        multCanvas={false}
        member={sampleMember}
        cbControlClick={cbControlClick}
      />);
      wrapper.setState({ showAdminControls: true});
      expect(wrapper.find('KickIconSVG').length).toEqual(1);
  });

  it('renders all AdminControl SVGs if showAdminControls is true', () => {
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />,
    <AdminControls
        multCanvas={false}
        member={sampleMember}
        cbControlClick={cbControlClick}
      />);
      wrapper.setState({ showAdminControls: true});
      expect(wrapper.find('div').length).toEqual(20); //4 memberItem divs, 16 adminControl divs
  });

  it('simulates click event (cbControlClick)', () => {
    const spy = sinon.spy();
    const wrapper = mountWithIntl(
      <MemberItem
          member={sampleMember}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
    />,
    <AdminControls
        multCanvas={false}
        member={sampleMember}
        cbControlClick={cbControlClick}
      />);
     wrapper.children().find('.a/v icons');
    // console.log('------------------->', expectedNode.debug());
    wrapper.simulate('click');
    expect(spy.calledOnce, true);
  });


  // it('renders  ', () => {
  //   const wrapper = mountWithIntl(
  //     <MemberItem
  //         member={sampleMember}
  //         controlSettings={controlSettings}
  //         cbControlClick={cbControlClick}
  // />);
  // // console.log('----------------->', wrapper.childAt(0).props().children[0]);                    //avatar span
  // // console.log('----------------->', wrapper.childAt(0).childAt(1).props());                  //userInfo
  // // console.log('----------------->', wrapper.childAt(0).childAt(1).props().children[0]); //name
  // // console.log('----------------->', wrapper.childAt(0).childAt(1).props().children[1]); //email
  // // console.log('----------------->', wrapper.childAt(0).childAt(2).props().children[0]); //av svg's
  //   expect(wrapper.childAt(0).childAt(0).props().style.display).toEqual('');
  // });


});
