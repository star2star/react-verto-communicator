//'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';

import NetworkStatusIndicator from '../components/nsIndicator.js';

jest.unmock('../components/nsIndicator.js');

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
  // networkData prop is provided.
  it('renders networkData', () => {
    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} />);
    expect(wrapper.props().networkData).toEqual(sampleData);

  });

  // If allowDisplayDetails is true whole component will render :D
  it('renders allowDisplayDetails as false if provided', () => {
    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} allowDisplayDetails={false}/>);
    expect(wrapper.find('NetworkStatusIndicator').length).toEqual(1);
  });

  //If allowDisplayDetails is false an icon will render
  it('renders allowDisplayDetails as true if NOT provided', () => {
    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} />);
    expect(wrapper.find('SignalFullIconSVG').length).toEqual(1);
  });

  // Menu displays networkData.upkpbs
  it('renders allowDisplayDetails as true if provided', () => {
    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} allowDisplayDetails />);
    expect(wrapper.props().allowDisplayDetails).toEqual(true);
  });

  // If displayDropdown is true it renders CaretUpIconSVG.
  it('renders CaretUpIconSVG if displayDropdown is true', () => {
    const wrapper = shallow(<NetworkStatusIndicator networkData={sampleData} />);
    wrapper.setState({ dropdownDisplayed: true});
    expect(wrapper.find('CaretUpIconSVG').length).toEqual(1);
  });

  //If displayDropdown is false it renders CaretDownIconSVG.
  it('renders CaretUpIconSVG if displayDropdown is true', () => {
    const wrapper = shallow(<NetworkStatusIndicator networkData={sampleData} />);
    wrapper.setState({ dropdownDisplayed: false});
    expect(wrapper.find('CaretDownIconSVG').length).toEqual(1);
  });

  // If bwp is 4 it renders full signal svgIcons
  it('renders SignalFullIconSVG if network data is considered good', () => {
     const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} />);
     expect(wrapper.find('SignalFullIconSVG').length).toEqual(1);
  });

  // If bwp is 3 it renders med signal svgIcons
  it('renders SignalMedIconSVG if network data is considered med', () => {
    //expect(true).toBe(true);
     const wrapper = mount(<NetworkStatusIndicator networkData={medData} />);
     expect(wrapper.find('SignalMediumIconSVG').length).toEqual(1);
  });

  // if bwp is less than 3 it renders low signal svgIcons
  it('renders SignalLowIconSVG if network data is considered med', () => {
    //expect(true).toBe(true);
     const wrapper = mount(<NetworkStatusIndicator networkData={lowData} />);
     expect(wrapper.find('SignalLowIconSVG').length).toEqual(1);
  });

});
