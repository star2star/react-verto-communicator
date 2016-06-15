import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import MemberItem from '../components/memberItem';

jest.unmock('../components/memberItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for MemberItem', ()=>{

  const  = {

  };

  it(' ', () => {
    const wrapper = shallow(<MemberItem  />);
    //console.log(wrapper.childAt(1).childAt(2).props().children[2]);
    expect(wrapper.childAt(1).childAt(2).props().children[2]).toEqual();
  });

  it(' ', () => {
    const wrapper = shallow(<MemberItem />);
    //console.log(wrapper.childAt(1).childAt(2).props().children[2]);
    expect(wrapper.childAt(1).childAt(2).props().children[0]).toEqual();
  });


});
