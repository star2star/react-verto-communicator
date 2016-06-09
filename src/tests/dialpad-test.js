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

  it('displays a label', () => {
    const wrapper = shallow(<StyleRoot><Dialpad lastCall={lastCall}  nbrToDial={nbrToDial} cbCall={cbCall} /></StyleRoot>);
    console.log('%%%%%%%%%%%%%%%%%%%%', wrapper.get(0).props.label);
  });

});
