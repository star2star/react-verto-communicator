import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import Settings from '../components/settings.js';

 jest.unmock('../components/settings.js');
 jest.unmock('../components/svgIcons.js');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('../js/messages.js');

describe('Settings Component', ()=>{

  // const sampleSettingsData = {
  //     askRecoverCall: false,
  //     autoBand: true,
  //     bestFrameRate: { id:"15", label:"15 FPS" },
  //     googEchoCancellation: true,
  //     googNoiseSuppression: true,
  //     incomingBandwidth: "default",
  //     language:"en",
  //     languages: {id:"en", name:"English"},
  //     mirrorInput: false, outgoingBandwidth: "default",
  //     selectedAudio: [],
  //     selectedBestFrameRate: [],
  //     selectedShare: [],
  //     selectedSpeaker: [],
  //     selectedVideo: [],
  //     testSpeedJoin: true,
  //     useDedence: false,
  //     useSTUN: true,
  //     useStereo: true,
  //     vidQual:undefined
  // };


const cbSubmitSetting=sinon.spy();
const cbPreviewSet=sinon.spy();
const cbDeviceList=sinon.spy();
const cbToggleShowSettings=sinon.spy();


it('renders container div', () => {
  //expect(true).toBe(true);
   const wrapper = shallowWithIntl(
     <Settings
         cbSubmitSetting={cbSubmitSetting}
         cbPreviewSet={cbPreviewSet}
         cbDeviceList={cbDeviceList}
         cbToggleShowSettings={cbToggleShowSettings}
       />);
   expect(wrapper.find('div').length).toEqual(0);
 });

  it('renders CaretUpIconSVG if displayDropdown is true', () => {
   const wrapper = mountWithIntl(
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
     const wrapper = mountWithIntl(
       <Settings
           cbSubmitSetting={cbSubmitSetting}
           cbPreviewSet={cbPreviewSet}
           cbDeviceList={cbDeviceList}
           cbToggleShowSettings={cbToggleShowSettings}
     />);
     wrapper.setState({ dropdownDisplayed: false});
     expect(wrapper.find('CaretDownIconSVG').length).toEqual(1);
   });


    it('cbSubmitSetting callback fires', function () {
        const wrapper = shallowWithIntl(
          <Settings
              cbSubmitSetting={cbSubmitSetting}
              cbPreviewSet={cbPreviewSet}
              cbDeviceList={cbDeviceList}
              cbToggleShowSettings={cbToggleShowSettings}
        />);
        expect(cbSubmitSetting.calledOnce);
      });

      it('cbPreviewSet callback fires', function () {
          const wrapper = shallowWithIntl(
            <Settings
                cbSubmitSetting={cbSubmitSetting}
                cbPreviewSet={cbPreviewSet}
                cbDeviceList={cbDeviceList}
                cbToggleShowSettings={cbToggleShowSettings}
          />);
          expect(cbPreviewSet.calledOnce);
        });

      it('cbDeviceList callback fires', function () {
          const wrapper = shallowWithIntl(
            <Settings
                cbSubmitSetting={cbSubmitSetting}
                cbPreviewSet={cbPreviewSet}
                cbDeviceList={cbDeviceList}
                cbToggleShowSettings={cbToggleShowSettings}
          />);
          expect(cbDeviceList.calledOnce);
        });

      it('cbToggleShowSettings callback fires', function () {
          const wrapper = shallowWithIntl(
            <Settings
                cbSubmitSetting={cbSubmitSetting}
                cbPreviewSet={cbPreviewSet}
                cbDeviceList={cbDeviceList}
                cbToggleShowSettings={cbToggleShowSettings}
          />);
          expect(cbToggleShowSettings.calledOnce);
        });

});
