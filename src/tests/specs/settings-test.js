import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import Settings from '../components/Settings.js';

 jest.unmock('../components/Settings.js');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');

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

const cbSubmitSetting=()=>{console.log('called')};

it('renders one select tag', () => {
  //expect(true).toBe(true);
   const wrapper = shallow(
     <Settings settingsData={sampleSettingsData} cbSubmitSetting={cbSubmitSetting} />);
   expect(wrapper.find('select').length).toEqual(1);
 });

 it('renders two options', () => {
   //expect(true).toBe(true);
    const wrapper = shallow(
      <Settings options={options} label={label} selectedOption={selectedOption} cbSubmitSetting={cbSubmitSetting} />);
    expect(wrapper.find('option').length).toEqual(2);
  });


});
