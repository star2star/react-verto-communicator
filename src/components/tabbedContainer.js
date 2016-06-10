import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Radium from 'radium';


const propTypes = {
  activeTab: React.PropTypes.number,
  compStyle: React.PropTypes.object,
  tabLabels: React.PropTypes.array.isRequired
};


export default class TabbedContainer extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {activeTabIndex: this.props.activeTab ? this.props.activeTab : 0};
  }

  handleTabClick(index) {
    this.setState({...this.state, activeTabIndex: index});
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      mainStyles: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      },
      tabStyles: {
        flex: '1'
      }

    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  render(){
    const tabs = this.props.tabLabels.map((label, index)=>{
      let theStyle=this.getStyle("tabStyles");
      if (index == this.state.activeTabIndex) {
        theStyle = {...theStyle, borderBottom: "4px solid #1194f6"};
      }
      return(
        <div key={index} style={theStyle} onClick={()=>{this.handleTabClick(index);}}>{label}</div>
      );
    });

    const childToRender = React.Children.toArray(this.props.children)[this.state.activeTabIndex];

    // TODO ta - if we have tab label as prop in children, can pull from there
    // rather than as props for this component.... future?? maybe
    // console.log('############### props from child', childToRender.props);
    return(
      <div className="tabbedContainerWrap">
        <div style={this.getStyle("mainStyles")} >
          {tabs}
        </div>
        {childToRender}
      </div>
    );

  }
}


TabbedContainer.propTypes = propTypes;

export default Radium(TabbedContainer);
