import React from 'react';
import VertoBaseComponent from './vertobasecomponent';


const propTypes = {
  items: React.PropTypes.array.isRequired,
  selected: React.PropTypes.array,
  cbChange: React.PropTypes.func,
  compStyle: React.PropTypes.object
};

class ListSelect extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
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
      let styles=this.getStyle("itemStyles");
        if (this.props.selected && this.props.selected == index) {
          styles={...this.getStyle("itemStyles"), backgroundColor: '#eee'};
        }
        return (
          <li key={index} style={styles}
              onClick={()=>{this.props.cbChange(index);}}
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

ListSelect.propTypes = propTypes;

export default ListSelect;
