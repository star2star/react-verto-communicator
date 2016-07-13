import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
// import AlertService from '../js/alertService';
import AlertLog from '../components/alertLog';
import AlertLogItem from '../components/alertLogItem';

jest.unmock('../js/alertService');
jest.unmock('../components/alertLog');
jest.unmock('../components/alertLogItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');

describe('Default test for AlertLog', ()=>{

  function storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return storage[key] || null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }

window.localStorage = storageMock();

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
    const wrapper = shallowWithIntl(<AlertLog />);
     expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('renders two divs', () => {
    const wrapper = shallow(<AlertLog />);

     expect(wrapper.find('div').length).toEqual(1);
  });

});
