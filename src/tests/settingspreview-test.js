import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import SettingsPreview from '../components/settingsPreview';

jest.unmock('../components/settingsPreview');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for SettingsPreview', ()=>{

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


  it ('Displays the volume meter', () => {
    const wrapper = shallowWithIntl(<SettingsPreview settingsData={sampleSettingsData} cbClose={()=>{}} />);
    expect(wrapper.find('VolumeMeter').length).toEqual(0);
  });


});
