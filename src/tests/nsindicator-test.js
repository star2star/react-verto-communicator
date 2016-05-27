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

  // networkData prop is provided.
  it('renders networkData', () => {
    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} />);
    expect(wrapper.props().networkData).toEqual(sampleData);

  });

  // If compStyle is provided it is rendered.
  it('renders provided styles', () => {
    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} compStyle={{height: '30px'}} />);
    //console.log('%%%%%%%%%%%%', wrapper);
    expect(wrapper.props().compStyle.height).toEqual('30px');
  });

  // If allowDisplayDetails is false, it is false.
  it('renders allowDisplayDetails as false if provided', () => {
    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} allowDisplayDetails={false}/>);
    //console.log('%%%%%%%%%%%%', wrapper);
    expect(wrapper.props().allowDisplayDetails).toEqual(false);
  });

  it('renders allowDisplayDetails as true if NOT provided', () => {

    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} />);
    expect(wrapper.props().allowDisplayDetails).toEqual(true);

  });

  // If allowDisplayDetails is true, it is true.
  it('renders allowDisplayDetails as true if provided', () => {

    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} />);
    expect(wrapper.props().allowDisplayDetails).toEqual(true);

  });

  // Menu displays networkData.upkpbs
  it('renders allowDisplayDetails as true if provided', () => {

    const wrapper = mount(<NetworkStatusIndicator networkData={sampleData} allowDisplayDetails={true} />);
    expect(wrapper.props().allowDisplayDetails).toEqual(true);

  });

  // Menu displays networkData.downkpbs
  // Menu displays networkData.videoResolution
  // If displayDropdown is true it renders dropdown Menu
  // If displayDropdown is false it does NOT render dropdown.
  // If displayDropdown is true it renders CaretUpIconSVG.
  it('renders CaretUpIconSVG if displayDropdown is true', () => {
    const wrapper = shallow(<NetworkStatusIndicator networkData={sampleData} />);
    wrapper.setState({ dropdownDisplayed: true})
    expect(wrapper.find('CaretUpIconSVG').length).toEqual(1);
    expect(wrapper.find('CaretDownIconSVG').length).toEqual(0);
  });

  // If displayDropdown is false it renders CaretDownIconSVG.
  // it('renders CaretUpIconSVG if displayDropdown is true', () => {
  //   const wrapper = shallow(<NetworkStatusIndicator networkData={sampleData} />);
  //   wrapper.setState({ dropdownDisplayed: true})
  //   expect(wrapper.find('CaretUpIconSVG').length).toEqual(1);
  // });

  // If bwp is 4 it renders full signal svgIcons
  // If bwp is 3 it renders med signal svgIcons
  // if bwp is less than 3 it renders low signal svgIcons


});
