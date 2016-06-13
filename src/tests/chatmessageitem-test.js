import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import ChatMessageItem from '../components/chatMessageItem';

jest.unmock('../components/chatMessageItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');

describe('Default test for ChatMessageItem', ()=>{

});
