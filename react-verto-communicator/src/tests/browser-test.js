//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';

import BNS from '../components/browser.js';

 jest.unmock('../components/browser.js');

describe('Browser Not Supported Component', ()=>{

  it('renders <svg> tag', () => {

    //expect(true).toBe(true);

     const wrapper = shallow(<BNS  />);
     console.log('bns wrapper', wrapper.nodes);
     expect(wrapper.find('div').length).toEqual(1);

  });

  //TODO add more tests...
});
