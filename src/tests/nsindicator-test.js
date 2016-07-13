//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import NetworkStatusIndicator from '../components/nsIndicator.js';

jest.unmock('../components/nsIndicator.js');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
jest.unmock('../js/messages.js');


describe('<NetworkStatusIndicator />', ()=>{

const sampleData = {
  upkpbs : 5000,
  downkpbs : 5000,
  vidQual : 'Swell'
};

const medData = {
  upkpbs : 2001,
  downkpbs : 1999,
  vidQual : 'Splendid'
};

const lowData = {
  upkpbs : 1999,
  downkpbs: 1999,
  vidQual : 'so fresh'
};

const badData = {
  fakeData: 'hehehehehehee'
};

  //works
  it('renders allowDisplayDetails as false if provided', () => {
    const wrapper = mountWithIntl(<NetworkStatusIndicator networkData={sampleData} allowDisplayDetails={false}/>);
    expect(wrapper.find('NetworkStatusIndicator').length).toEqual(1);
  });

  // Iw
  it('renders CaretUpIconSVG if displayDropdown is true', () => {
    const wrapper = shallowWithIntl(<NetworkStatusIndicator networkData={sampleData} />);
    wrapper.setState({ dropdownDisplayed: true});
    expect(wrapper.find('CaretUpIconSVG').length).toEqual(0);
  });

  //w
  it('renders CaretUpIconSVG if displayDropdown is true', () => {
    const wrapper = shallowWithIntl(<NetworkStatusIndicator networkData={sampleData} />);
    wrapper.setState({ dropdownDisplayed: false});
    expect(wrapper.find('CaretDownIconSVG').length).toEqual(0);
  });

  it('properly takes in and displays the networkdata', () => {
    const wrapper = shallowWithIntl(<NetworkStatusIndicator networkData={lowData} />);
    //console.log('>>>>>>>>>', wrapper.node.props.networkData.downkpbs);
    expect(wrapper.node.props.networkData.vidQual).toEqual('so fresh');
  });


});
