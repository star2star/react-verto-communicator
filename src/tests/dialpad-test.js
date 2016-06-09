//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';

import Dialpad from '../components/dialpad.js';

jest.unmock('../components/dialpad.js');

describe('<Dialpad />', ()=>{
const lastCall = "9413569660";
const nbrToDial = "9045299947";
const cbCall = function() {
  return 'cbCall executed';
};

  // input focused ? inputFocused state changed to true
  //it('changes state to true on focus', () => {
    // const wrapper = mount(<StyleRoot><Dialpad lastCall={lastCall}  nbrToDial={nbrToDial} cbCall={cbCall} /></StyleRoot>);
    // wrapper.setState({inputFocused: true});
    // //console.log('********************', wrapper.children().first().props());
    // //console.log('$$$$$$$$$$$$$$$$$$$$$$', wrapper.children().first().find('.input'));
    // const input = wrapper.children().first().find('.input');
    // input.simulate('focus');
    // expect(wrapper.state().inputFocused).toEqual(true);
    // });
    //
    // it('changes state to false on blur', () => {
    //   const wrapper = mount(<StyleRoot><Dialpad lastCall={lastCall}  nbrToDial={nbrToDial} cbCall={cbCall} /></StyleRoot>);
    //   wrapper.setState({inputFocused: true});
    //   const input = wrapper.children().first().find('.input');
    //   console.log(input);
    //   input.simulate('blur', { target: { inputFocused: false } });
    //   expect(wrapper.state().inputFocused).toEqual(false);
    //   });

    it('accepts that it is being clicked', () => {
      const onFocusStub = sinon.spy();
      const wrapper = mount(<StyleRoot><Dialpad lastCall={lastCall}  nbrToDial={nbrToDial} cbCall={cbCall} /></StyleRoot>);
      const backIcon = wrapper.children().first().find('.back');
      backIcon.simulate('click');
      //console.log(backIcon.debug());

      backIcon.simulate('click');
      expect(onFocusStub.calledOnce, true);
      });

});
