//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
//import TestUtils from 'react-addons-test-utils';

import BrowserInfo from '../components/browserInfo.js';

 jest.unmock('../components/browserInfo.js');

describe('Browser Info Component', ()=>{

  it('renders <svg> tag', () => {

    //expect(true).toBe(true);

     const wrapper = shallow(<BrowserInfo  />);
     console.log('browserInfo wrapper', wrapper.nodes);
     expect(wrapper.find('div').length).toEqual(1);

  });

  //TODO add more tests...
});
