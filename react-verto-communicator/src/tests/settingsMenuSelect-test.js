import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import SettingsMenuSelect from '../components/settingsMenuSelect.js';

 jest.unmock('../components/settingsMenuSelect.js');

describe('settingsMenuSelect Component', ()=>{

const options=[{id:"none", label:"No Camera"}, {id: "1234", label:"FaceTime HD Camera"}];
const label="Camera:";
const selectedOption={id:"selectedVideo", label:"FaceTime HD Camera"};
const cbSubmitSetting=()=>{console.log('called');};

it('renders one select tag', () => {
  //expect(true).toBe(true);
   const wrapper = shallow(
     <SettingsMenuSelect
         options={options}
         label={label}
         selectedOption={selectedOption}
         cbSubmitSetting={cbSubmitSetting}
     />);
   expect(wrapper.find('select').length).toEqual(1);
 });

 it('renders two options', () => {
   //expect(true).toBe(true);
    const wrapper = shallow(
      <SettingsMenuSelect
          options={options}
          label={label}
          selectedOption={selectedOption}
          cbSubmitSetting={cbSubmitSetting}
      />);    expect(wrapper.find('option').length).toEqual(2);
  });

  it('cbSubmitSetting callback fires', function () {
      const wrapper = shallow(
        <SettingsMenuSelect
            options={options}
            label={label}
            selectedOption={selectedOption}
            cbSubmitSetting={cbSubmitSetting}
        />);
      expect(cbSubmitSetting.calledOnce);
    });

});
