//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';

import VCStatus from '../components/vcstatus.js';

 jest.unmock('../components/vcstatus.js');
 jest.unmock('../components/svgIcons.js');

describe('Verto Comm Status Component', ()=>{

  it('renders <svg> tag', () => {

    //expect(true).toBe(true);

     const wrapper = shallow(<VCStatus status='disconnected' />);
     console.log('vcstatus wrapper', wrapper.nodes[0].props);
     expect(wrapper.find('StatusIconSVG').length).toEqual(1);

  });

  //TODO add more tests...
});
