import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import MemberList from '../components/memberList';

jest.unmock('../components/memberList');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for MemberList', ()=>{

  const cbControlClick=sinon.spy();
  const members=[{key:1, member:"Name"},{key:2, member:"1Name", {key:3, member:"2Name"}}];

  it('renders a div', () => {
    const wrapper = shallow(
      <MemberList
        cbControlClick={cbControlClick}
        members={members}
        />);
     expect(wrapper.find('div').length).toEqual(1);
  });




});
