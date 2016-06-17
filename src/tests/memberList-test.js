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
  const members=[{key:0, member:"Name"},{key:1, member:"1Name"}, {key:2, member:"2Name"}];
  const controlSettings={ moderator: true, multCanvas: false, allowPresenter: true }

  it('renders a div', () => {
    const wrapper = shallow(
      <MemberList
        cbControlClick={cbControlClick}
        members={members}
        controlSettings={controlSettings}
        />);
     expect(wrapper.find('div').length).toEqual(1);
  });

  it('cbControlClick callback fires', function () {
      const wrapper = shallow(
        <MemberList
          cbControlClick={cbControlClick}
          members={members}
          controlSettings={controlSettings}
          />);
      expect(cbControlClick.calledOnce);
    });

    // it('renders the correct members ', () => {
    //   const wrapper = mount(<MemberList
    //     cbControlClick={cbControlClick}
    //     members={members}
    //     controlSettings={controlSettings}
    //     />);
    //   expect(wrapper.childAt(0).props()).toEqual({});
    // });


});
