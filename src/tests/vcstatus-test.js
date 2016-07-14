//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
//import TestUtils from 'react-addons-test-utils';

import VCStatus from '../components/vcstatus.js';

 jest.unmock('../components/vcstatus.js');
 jest.unmock('../components/svgIcons.js');
 jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('../js/messages.js');
 jest.unmock('moment');

describe('Verto Comm Status Component', ()=>{

  it('renders <svg> tag', () => {
    //expect(true).toBe(true);
     const wrapper = shallowWithIntl(<VCStatus status='disconnected' />);
     expect(wrapper.find('StatusIconSVG').length).toEqual(0);
  });

  //TODO add more tests...
});
