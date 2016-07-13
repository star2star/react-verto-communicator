import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import ContributorsListItem from '../components/contributorsListItem';

jest.unmock('../components/contributorsListItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for contributorsListItem', ()=>{


  it('the name prop gets passed in properly to the component', () => {
    const wrapper = mountWithIntl(<ContributorsListItem name="Matt" email="Matt@matt.com" avatar="../../pic.png" cbClose={()=>{}}/>);
    expect(wrapper.props().name).toEqual('Matt');
  });

  it('the email prop gets passed in properly to the component', () => {
    const wrapper = mountWithIntl(<ContributorsListItem name="Matt" email="Matt@matt.com" avatar="../../pic.png" cbClose={()=>{}}/>);
    expect(wrapper.props().email).toEqual('Matt@matt.com');
  });

  it('the avatar prop gets passed in properly to the component', () => {
    const wrapper = mountWithIntl(<ContributorsListItem name="Matt" email="Matt@matt.com" avatar="../../pic.png" cbClose={()=>{}}/>);
    expect(wrapper.props().avatar).toEqual('../../pic.png');
  });

  it('renders the correct number of statements based on the number of divs and spans', () => {
    const wrapper = mountWithIntl(<ContributorsListItem name="Matt" email="Matt@matt.com" avatar="../../pic.png" cbClose={()=>{}}/>);
    expect(wrapper.find('div' && 'span').length).toEqual(3);
  });

  it('renders one user icon per run', () => {
    const wrapper = mountWithIntl(<ContributorsListItem name="Matt" email="Matt@matt.com" avatar="../../pic.png" cbClose={()=>{}}/>);
    expect(wrapper.find('img').length).toEqual(1);
  });


});
