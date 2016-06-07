import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import Contributors from '../components/contributors';

jest.unmock('../components/contributors');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for Contributors', ()=>{
  const sampleData=[
    {name: "Matt", email: "Matt@matt.com", avatar: "../../pic.png"}
  ];

  it ('prints the right number of statements given one object', () => {
    const wrapper = shallowWithIntl(<Contributors contributorsData={sampleData} cbClose={()=>{}}/>);
    expect(wrapper.find('div').length).toEqual(2);
  });

  it ('renders the modal', () => {
    const wrapper = shallowWithIntl(<Contributors contributorsData={sampleData} cbClose={()=>{}}/>);
    expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('ensures the style is being applied proporly by cheking for one paticular value', () => {
    const wrapper =   shallowWithIntl(<Contributors contributorsData={sampleData} cbClose={()=>{}}/>);
    console.log(wrapper.props().style.content.right);
    expect(wrapper.props().style.content.right).toEqual('auto');
  });

});
