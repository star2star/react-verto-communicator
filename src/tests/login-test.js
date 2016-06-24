//'use strict';
import React from 'react';
//import { shallow, mount, render } from 'enzyme';
//import sinon from 'sinon';
//import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';

import Login from '../components/login.js';

jest.unmock('../components/login.js');
jest.unmock('../components/input.js');
//jest.unmock('../containers/appbar/index.js');
//jest.unmock('../main.js');

describe('<Login />', ()=>{
  const settings = {
    name : 'kc nichols',
    email : 'knichols@star2star.com',
    user : 'kc',
    password : '1234',
    callerid : 'KC Nichols',
    hostname : 'gator',
    websocketurl : 'www.kc.com'
  };
  //const intl =


  it('displays a label', () => {
    const wrapper = shallowWithIntl(<Login settings={settings} />);
    // console.log('%%%%%%%%%%%%%%%%%%%%', wrapper);
    //expect(wrapper.get(0).props.settings).toEqual(settings);
  });

});
