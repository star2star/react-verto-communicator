import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import About from '../components/about';

jest.unmock('../components/about.js');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
//the three tests that fail are the result of the fact that the gitRev section of the component was removed recently 

describe('Default test for about', ()=>{

  it('renders the correct number of elements', () => {
    const wrapper = shallowWithIntl(<About cbClose={()=>{}}/>);
    expect(wrapper.find('div').length).toEqual(5);
  });

  it('assigns the correct value to version, depending on what is passed in', () => {
    const wrapper = mountWithIntl(<About version='3.9.236' cbClose={()=>{}}/>);
    expect(wrapper.props().version).toEqual('3.9.236');
  });

  it('assigns the correct value to gitRev, depending on what is passed in', () => {
    const wrapper = mountWithIntl(<About gitRev='LRE785' cbClose={()=>{}}/>);
    expect(wrapper.props().gitRev).toEqual('LRE785');
  });

  it('renders the images', () => {
     const wrapper = shallowWithIntl(<About cbClose={()=>{}}/>);
     expect(wrapper.find('img').length).toEqual(2);
  });

  it('renders a modal', () => {
     const wrapper = shallowWithIntl(<About cbClose={()=>{}}/>);
     expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('the component has 3 internationalized messages', () => {
     const wrapper = shallowWithIntl(<About cbClose={()=>{}}/>);
     expect(wrapper.find('FormattedMessage').length).toEqual(3);
  });

  it('prints the gitRev and version props in line with their FormattedMessages', () => {
     const wrapper = shallowWithIntl(<About cbClose={()=>{}}/>);
     expect(wrapper.find('span').length).toEqual(2);
  });


});
