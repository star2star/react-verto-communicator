//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
//import CallHistory from '../components/callhistory.js';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
//import CallHistoryItem from '../callHistoryItem';
//import CallHistoryService from '../js/callHistory';
import Dialpad from '../components/dialpad.js';

jest.unmock('../components/dialpad.js');
jest.unmock('../components/callHistory.js');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');
//jest.unmock('../callHistoryItem');
//jest.unmock('../js/callHistory');

describe('<Dialpad />', ()=>{
const lastCall = "9413569660";
const nbrToDial = "9045299947";
const a = '';
const cbCall = function() {
  return 'cbCall executed';
};

    it('erases when back icon is clicked', () => {
      const onFocusStub = sinon.spy();
      const wrapper = mountWithIntl(<StyleRoot><Dialpad lastCall={lastCall}  nbrToDial={nbrToDial} cbCall={cbCall} /></StyleRoot>);
      const backIcon = wrapper.children().first().find('.back');
      const inputArea = wrapper.children().first().find('.input');

      //console.log(inputArea.props());
      backIcon.simulate('click');
      expect(onFocusStub.calledOnce, true);
      expect(inputArea.props().value).toEqual('904529994');
      //console.log(inputArea.props());
    });

   it('displays lastNumber if number input is empty and dial is clicked.', () => {
      const onClickStub = sinon.spy();
      const wrapper = mountWithIntl(<StyleRoot><Dialpad lastNumber={lastCall}  nbrToDial={a} cbCall={cbCall} /></StyleRoot>);
      const dial = wrapper.children().first().find('.dial');
      const inputArea = wrapper.children().first().find('.input');

      dial.simulate('click');
      expect(onClickStub.calledOnce, true);
      expect(inputArea.props().value).toEqual('9413569660');
      });

    // it('triggers a click event on callhistory icon', () => {
    //    const onClickStub = sinon.spy();
    //    const wrapper = mount(<StyleRoot><Dialpad lastNumber={lastCall}  nbrToDial={a} cbCall={cbCall} /></StyleRoot>);
    //    const callhist = (wrapper.children().first().find('.callhist'));
    //
    //    callhist.simulate('click');
    //    expect(onClickStub.calledOnce, true);
    //    });



});
