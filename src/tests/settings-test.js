import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import Settings from '../components/Settings.js';

 jest.unmock('../components/Settings.js');

describe('Settings Component', ()=>{

  const sampleSettingsData = {
      askRecoverCall: false,
      autoBand: true,
      bestFrameRate: { id:"15", label:"15 FPS" },
      googEchoCancellation: true,
      googNoiseSuppression: true,
      incomingBandwidth: "default",
      language:"en",
      languages: {id:"en", name:"English"},
      mirrorInput: false, outgoingBandwidth: "default",
      selectedAudio: [],
      selectedBestFrameRate: [],
      selectedShare: [],
      selectedSpeaker: [],
      selectedVideo: [],
      testSpeedJoin: true,
      useDedence: false,
      useSTUN: true,
      useStereo: true,
      vidQual:undefined
  };


const cbSubmitSetting=sinon.spy();
const cbPreviewSet=sinon.spy();
const cbDeviceList=sinon.spy();
const cbToggleShowSettings=sinon.spy();


it('renders container div', () => {
  //expect(true).toBe(true);
   const wrapper = shallow(
     <Settings
         cbSubmitSetting={cbSubmitSetting}
         cbPreviewSet={cbPreviewSet}
         cbDeviceList={cbDeviceList}
         cbToggleShowSettings={cbToggleShowSettings}
       />);
   expect(wrapper.find('div').length).toEqual(1);
 });

  it('renders CaretUpIconSVG if displayDropdown is true', () => {
   const wrapper = mount(
     <Settings
         cbSubmitSetting={cbSubmitSetting}
         cbPreviewSet={cbPreviewSet}
         cbDeviceList={cbDeviceList}
         cbToggleShowSettings={cbToggleShowSettings}
     />);
     wrapper.setState({ dropdownDisplayed: true});
     expect(wrapper.find('CaretUpIconSVG').length).toEqual(1);
   });

   it('renders CaretDownIconSVG if displayDropdown is true', () => {
     const wrapper = mount(
       <Settings
           cbSubmitSetting={cbSubmitSetting}
           cbPreviewSet={cbPreviewSet}
           cbDeviceList={cbDeviceList}
           cbToggleShowSettings={cbToggleShowSettings}
     />);
     wrapper.setState({ dropdownDisplayed: false});
     expect(wrapper.find('CaretDownIconSVG').length).toEqual(1);
   });

  //  it('renders fill: if allowDisplayDetails is true', () => {
  //    const wrapper = mount(
  //      <Settings
  //          cbSubmitSetting={cbSubmitSetting}
  //          cbPreviewSet={cbPreviewSet}
  //          cbDeviceList={cbDeviceList}
  //          cbToggleShowSettings={cbToggleShowSettings}
  //    />);
  //    wrapper.setState({ allowDisplayDetails: true});
  //   //  console.log('---------------',wrapper.childAt(2).props().style.fill);
  //    expect(wrapper.childAt(3).props().style.fill).toEqual('#fff');
  //  });

});
