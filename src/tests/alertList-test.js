import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AlertList from '../components/alertList';
import AlertItem from '../components/alertItem';

jest.unmock('../components/alertItem');
jest.unmock('../components/alertList');
jest.unmock('../helpers/intl-enzyme-test-helper.js');


describe('Default test for AlertList', ()=>{

  const cbDismissAlert = sinon.spy();
  const sampleData = {
    level:"warn",
    timestamp:1466703201123,
    summary: "Can't hang up while sharing screen",
    detail: "You must stop sharing your screen before you can hangup the call",
    id: 0
    };
    const sampleKey = {
      id: 0
    };


  it('renders a div', () => {
    const wrapper = shallow(
      <AlertList
      />);
     expect(wrapper.find('div').length).toEqual(1);
  });


});
