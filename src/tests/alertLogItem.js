import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AlertLogItem from '../components/alertLogItem';
import ControlItem from '../components/controlItem';
import moment from 'moment';

jest.unmock('../components/controlItem');
jest.unmock('../components/alertLogItem');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('moment');
 jest.unmock('../js/messages.js');

describe('Default test for AlertLog', ()=>{

  const cbRemoveAlert = sinon.spy();
  const sampleData = {
    level:"warn",
    timestamp:"1466703201123",
    summary: "Can't hang up while sharing screen",
    detail: "You must stop sharing your screen before you can hangup the call",
    id: 0
    };
    const sampleKey = {
      id: 0
    };


  it('renders 5 divs', () => {
    const wrapper = mountWithIntl(
      <AlertLogItem
          key={sampleKey}
          alertData={sampleData}
          cbRemoveAlert={cbRemoveAlert}
      />);
     expect(wrapper.find('div').length).toEqual(5);
  });
  
  it('simulates click event (cbDismissAlert)', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <AlertItem
          key={sampleKey}
          alertData={sampleData}
          cbDismissAlert={cbDismissAlert}
     />);
    const expectedNode = wrapper.children().find('.heading');
    //console.log(expectedNode.debug());
    expectedNode.simulate('click');
    expect(spy.calledOnce, true);
  });
//
//   it('renders MicrophoneIconSVG if audio is not muted', () => {
//     const wrapper = mountWithIntl(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//     />);
//     expect(wrapper.find('MicrophoneIconSVG').length).toEqual(1);
//   });
//
//   it('renders MuteVideoIconSVG if video is muted', () => {
//     const wrapper = mountWithIntl(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//     />);
//     expect(wrapper.find('MuteVideoIconSVG').length).toEqual(1);
//   });
//
//   it('renders PresenterIconSVG', () => {
//     const wrapper = mountWithIntl(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//     />);
//     expect(wrapper.find('PresenterIconSVG').length).toEqual(1);
//   });
//
//   it('Takes in & displays props correctly (name:)', () => {
//     const wrapper = mountWithIntl(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//     />);
//     expect(wrapper.props().member.name).toEqual('Name');
//   });
//
//   it('Takes in & displays props correctly (email:)', () => {
//     const wrapper = mountWithIntl(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//     />);
//     expect(wrapper.props().member.avatar.email).toEqual('Name@email.com');
//   });
//
//   it('renders AdminControl SVGs if showAdminControls is true', () => {
//     const wrapper = mountWithIntl(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//     />,
//     <AdminControls
//         multCanvas={false}
//         member={sampleMember}
//         cbControlClick={cbControlClick}
//       />);
//       wrapper.setState({ showAdminControls: true});
//       expect(wrapper.find('KickIconSVG').length).toEqual(1);
//   });
//
//   it('renders all AdminControl SVGs if showAdminControls is true', () => {
//     const wrapper = mountWithIntl(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//     />,
//     <AdminControls
//         multCanvas={false}
//         member={sampleMember}
//         cbControlClick={cbControlClick}
//       />);
//       wrapper.setState({ showAdminControls: true});
//       expect(wrapper.find('div').length).toEqual(20);
//   });


});
