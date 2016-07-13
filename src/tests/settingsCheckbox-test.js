import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SettingsCheckbox from '../components/settingsCheckbox.js';

 jest.unmock('../components/settingsCheckbox.js');

describe('settingsCheckbox Component', ()=>{

const label="Use Video";
const checkedOption={name:"useVideo", value: true};
const uncheckedOption={name:"useVideo", value: false};
const cbSubmitSetting=sinon.spy();

it('renders a input tag', () => {
  //expect(true).toBe(true);
   const wrapper = shallow(
     <SettingsCheckbox
         checkedOption={checkedOption}
         cbSubmitSetting={cbSubmitSetting}
         label={label}
      />);
   expect(wrapper.find('input').length).toEqual(1);
 });

  it('renders a div', () => {
    // expect(true).toBe(true);
     const wrapper = shallow(
       <SettingsCheckbox
           checkedOption={checkedOption}
           cbSubmitSetting={cbSubmitSetting}
           label={label}
        />);
     expect(wrapper.find('div').length).toEqual(2);
  });

  it('renders a span', () => {
    // expect(true).toBe(true);
     const wrapper = mount(
       <SettingsCheckbox
           checkedOption={checkedOption}
           cbSubmitSetting={cbSubmitSetting}
           label={label}
        />);
     expect(wrapper.find('span').length).toEqual(2);
   });

   it('renders a label', () => {
     // expect(true).toBe(true);
      const wrapper = mount(
        <SettingsCheckbox
            checkedOption={checkedOption}
            cbSubmitSetting={cbSubmitSetting}
            label={label}
         />);
      expect(wrapper.props().label).toEqual("Use Video");
   });

   it('should have an input(checkbox)', function () {
       const wrapper = shallow(
         <SettingsCheckbox
             checkedOption={checkedOption}
             cbSubmitSetting={cbSubmitSetting}
             label={label}
          />);
       expect(wrapper.find('input').length).toEqual(1);
     });

     it('cbSubmitSetting callback fires', function () {
         const wrapper = shallow(
           <SettingsCheckbox
               checkedOption={checkedOption}
               cbSubmitSetting={cbSubmitSetting}
               label={label}
            />);
         expect(cbSubmitSetting.calledOnce);
       });

       it('should be true, the checkedOption value ', function () {
           const wrapper = mount(
             <SettingsCheckbox
                 checkedOption={checkedOption}
                 cbSubmitSetting={cbSubmitSetting}
                 label={label}
              />);
           expect(wrapper.props().checkedOption.value).toEqual(true);
         });

         it('checkedOption value should render false', function () {
             const wrapper = mount(
               <SettingsCheckbox
                   checkedOption={uncheckedOption}
                   cbSubmitSetting={cbSubmitSetting}
                   label={label}
                />);
             expect(wrapper.props().checkedOption.value).toEqual(false);
           });

         it('renders checkedOption name ', function () {
             const wrapper = mount(
               <SettingsCheckbox
                   checkedOption={checkedOption}
                   cbSubmitSetting={cbSubmitSetting}
                   label={label}
                />);
             expect(wrapper.props().checkedOption.name).toEqual("useVideo");
           });

});
