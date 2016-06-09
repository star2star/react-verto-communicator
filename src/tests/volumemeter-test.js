import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import VolumeMeter from '../components/volumeMeter';

jest.unmock('../components/volumeMeter.js');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for VolumeMeter', ()=>{

  it('renders 5 segments as well as the icon', () => {
     const wrapper = shallow(<VolumeMeter volumeLevel={2} />);
     expect(wrapper.find('div').length).toEqual(6);
  });

  it('renders 1 filled segment at a "volume level" of 2', () => {
     const wrapper = mountWithIntl(<VolumeMeter volumeLevel={2} /> );
     //console.log(wrapper.find('#1').props().style.backgroundColor);
     expect(wrapper.find('#1').props().style.backgroundColor).toEqual('#ccc');
  });

  it('renders 4 un-filled segments at a "volume level" of 2', () => {
     const wrapper = mountWithIntl(<VolumeMeter volumeLevel={2} /> );
     //console.log(wrapper.find('#3' && '#2').props().style.backgroundColor);
     expect(wrapper.find('#2' && '#3' && '#4' && '#5').props().style.backgroundColor).toEqual(undefined);
  });

  it('renders 3 filled segments at a "volume level" of 70', () => {
     const wrapper = mountWithIntl(<VolumeMeter volumeLevel={70} /> );
     expect(wrapper.find('#1' && '#2' && '#3').props().style.backgroundColor).toEqual('#ccc');
  });

  it('renders 2 un-filled segments at a "volume level" of 70', () => {
     const wrapper = mountWithIntl(<VolumeMeter volumeLevel={70} /> );
     expect(wrapper.find('#4' && '#5').props().style.backgroundColor).toEqual(undefined);
  });

  it('renders 5 filled segments at a "volume level" of 9001', () => {
     const wrapper = mountWithIntl(<VolumeMeter volumeLevel={9001} /> );
     expect(wrapper.find('#1' && '#2' && '#3' && '#4' && '#5').props().style.backgroundColor).toEqual('#ccc');
  });

  it('renders 0 un-filled segments at a "volume level" of 9001', () => {
     const wrapper = mountWithIntl(<VolumeMeter volumeLevel={9001} /> );
     expect(wrapper.find('#1' && '#2' && '#3' && '#4' && '#5').props().style.backgroundColor).not.toEqual(undefined);
  });


});
