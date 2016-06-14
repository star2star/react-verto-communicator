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


const cbSubmitSetting=()=>{console.log('Submitcalled');};
const cbPreviewSet=()=>{console.log('Previewcalled');};
const cbDeviceList=()=>{console.log('Devicecalled');};
const cbToggleShowSettings=()=>{console.log('ShowSettingscalled');};


it('renders a div', () => {
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

 it('uses the settingsCheckbox component', ()=> {
   const wrapper = mount(
     <Settings
         cbSubmitSetting={cbSubmitSetting}
         cbPreviewSet={cbPreviewSet}
         cbDeviceList={cbDeviceList}
         cbToggleShowSettings={cbToggleShowSettings}
     />);
   expect(wrapper.find('SettingsCheckbox').props().statusTitle).toEqual(1);
 });


});
