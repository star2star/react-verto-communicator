import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import ChatInput from '../components/chatinput';

jest.unmock('../components/chatinput.js');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for VolumeMeter', ()=>{

  it('renders the input feild', () => {
     const wrapper = shallow(<ChatInput sessionId="255" />);
     expect(wrapper.find('input').length).toEqual(1);
  });

  it('triggers an event when the enter key is pressed', () => {
     const onClickStub = sinon.spy();
     const wrapper = mount(<ChatInput sessionId="867" />);
     const chatinp = (wrapper.children().first().find('input'));
     chatinp.simulate('keyPress');
     expect(onClickStub.calledOnce, true);
  });

  it('renders the container for the input', () => {
     const wrapper = shallow(<ChatInput sessionId="1800" />);
     expect(wrapper.find('div').length).toEqual(1);
  });

});
