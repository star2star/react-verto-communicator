import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { fromJS } from "immutable";


class ListSelect extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    items: React.PropTypes.array,
    selected: React.PropTypes.array,
    cbChange: React.PropTypes.func,
    compStyle: React.PropTypes.object
  };

  static defaultProps = {
    items: []
  };

  static filename = "listSelect";
  static displayName = "ListSelect";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
      const styles = {
        listStyles: {
          listStyleType: 'none',
          backgroundColor: '#fff',
          padding: '0px 10px'
        },
        itemStyles: {
          margin: '4px 0'
        }
      };
      return (styles[styleName]);
  }

  render() {
    const listItems = this.props.items.map((item, index)=>{
      const liOnClick = ()=>{this.props.cbChange(index);}

      let styles=this.getStyle("itemStyles");

      if (this.props.selected && this.props.selected == index) {
        styles={...this.getStyle("itemStyles"), backgroundColor: '#eee'};
      }

      return (
        <li key={index} style={styles}
            onClick={liOnClick}
        >
          {item}
        </li>
      );
    });

     return (<ul style={this.getStyle('listStyles')}>
              {listItems}
             </ul>);
  }
}

export default ListSelect;
// reviewed on 7/13/2016
