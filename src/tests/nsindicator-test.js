//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';

import NetworkStatusIndicator from '../components/nsIndicator.js';

jest.unmock('../components/nsIndicator.js');

describe('NetworkStatusIndicator', ()=>{

  it('renders <svg> tag', () => {

     const wrapper = shallow(<BNS  />);
     console.log('bns wrapper', wrapper.nodes);
     expect(wrapper.find('div').length).toEqual(1);

  });

  //TODO add more tests...
});
