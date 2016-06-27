import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { mountWithIntl, shallowWithIntl } from '../helpers/intl-enzyme-test-helper.js';
import ControlItem from '../components/controlItem';

jest.unmock('../components/controlItem');
jest.unmock('../helpers/intl-enzyme-test-helper.js');
 jest.unmock('../components/svgIcons.js');

describe('Default test for ControlItem', ()=>{
  const cbActionClick = sinon.spy();
  const label = "label"

  it('renders two spans', () => {
    const wrapper = shallow(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
      />);
     expect(wrapper.find('span').length).toEqual(2);
  });

  it('renders a ', () => {
    const wrapper = mount(
      <ControlItem
          type="RemoveIconSVG"
          cbActionClick={cbActionClick}
          label={label}
      />);
     expect(wrapper.find(1).props.label).toEqual("label");
  });

});
