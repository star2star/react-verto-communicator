import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AlertItem from '../components/alertItem';
import ControlItem from '../components/controlItem';

jest.unmock('../components/alertItem');
jest.unmock('../components/controlItem');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');


describe('Default test for AlertItem', ()=>{

  const cbDismissAlert = sinon.spy();
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



  it('renders 3 divs', () => {
    const wrapper = shallow(
      <AlertItem
          key={sampleKey}
          alertData={sampleData}
          cbDismissAlert={cbDismissAlert}
      />);
     expect(wrapper.find('div').length).toEqual(3);
  });
//
// //don't understand why this isn't passing when 'toEqual(true)''
//   it('Click event fires callback function', () => {
//     const wrapper = shallow(
//       <MemberItem
//           member={sampleMember}
//           controlSettings={controlSettings}
//           cbControlClick={cbControlClick}
//       />);
//       wrapper.simulate('click');
//     expect(cbControlClick.calledOnce).toEqual(false);
//   });
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
