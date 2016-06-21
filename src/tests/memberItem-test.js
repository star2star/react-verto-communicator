import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import MemberItem from '../components/memberItem';

jest.unmock('../components/memberItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for MemberItem', ()=>{

  const cbControlClick = sinon.spy();
  // const members = [{key:"0", member:"Name"},{key:"1", member:"1Name"}, {key:"2", member:"2Name"}];
  const controlSettings = { moderator: true, multCanvas: false, allowPresenter: true }
  const member = [
    {key: "0003"},
    {email:"figmentthepurpledragonatepcotcenter@epcotcenter.com"},
    {name:"Figment"},
    {3:"opus@48000"},
    {4:{audio:{muted:false, onHold:false, talking:true,floor:false,energyScore:"1"},
      video:{visible:false,videoOnly:false,avatarPresented:false,mediaFlow:"sendOnly",muted:true,floor:false,reservationID:null,videoLayerID:"-1"},oldStatus:"TALKING VIDEO (BLIND)"}},
    {5:{avatar:"http://gravatar.com/avatar/49a150958fb5441c88608df39848b4db.png?s=600",
          email:"figmentthepurpledragonatepcotcenter@epcotcenter.com"}}
];


  it('renders 4 divs', () => {
    const wrapper = mount(
      <MemberItem
          member={member}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
      />);
     expect(wrapper.find('div').length).toEqual(4);
  });

  it('Click event fires callback function', () => {
    const wrapper = shallow(
      <MemberItem
          member={member}
          controlSettings={controlSettings}
          cbControlClick={cbControlClick}
      />);
      wrapper.simulate('click');
    expect(cbControlClick.calledOnce).toEqual(true);
  });

  it('renders MuteMicrophoneIconSVG', () => {
    const wrapper = shallow(
      <MemberItem
        member={member}
        controlSettings={controlSettings}
        cbControlClick={cbControlClick}
    />);
    expect(wrapper.find('MuteMicrophoneIconSVG').length).toEqual(1);
  });

  // it(' ', () => {
  //   const wrapper = shallow(<MemberItem />);
  //   //console.log(wrapper.childAt(1).childAt(2).props().children[2]);
  //   expect(wrapper.childAt(1).childAt(2).props().children[0]).toEqual();
  // });


});
