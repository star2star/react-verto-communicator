import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import AlertLog from '../components/alertLog';
import AlertLogItem from '../components/alertLogItem';


jest.unmock('../components/alertLog');
jest.unmock('../components/alertLogItem');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');

describe('Default test for AlertLog', ()=>{

  const cbRemoveAlert = sinon.spy();
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

    it('renders a modal', () => {
      const wrapper = mount(
        <AlertLog
            key={sampleKey}
            alertData={sampleData}
            cbRemoveAlert={cbRemoveAlert}
        />);
       expect(wrapper.find('modal').length).toEqual(1);
    });

  it('renders 2 divs', () => {
    const wrapper = mount(
      <AlertLog
      />);
     expect(wrapper.find('div').length).toEqual(2);
  });

});
