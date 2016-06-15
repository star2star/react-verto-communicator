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
        alignContent: 'center',
        flex: '0 0 36px'  // keep this at constant height as flex item within tabbedContainerWrap column
      },
      wrapStyles: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%' // Set up height of wrapper
      },
      tabStyles: {
        flex: '1'
      },
      containerStyles: {
        flex: '1', // this flex item will grow/shrink within tabbedContainerWrap column
        overflow: 'hidden' // need this so that the chat list and memberlist will scroll on overflow
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
      <div className="tabbedContainerWrap" style={this.getStyle("wrapStyles")}>
        <div style={this.getStyle("mainStyles")} >
          {tabs}
        </div>
        <div className="selTabContainer" style={this.getStyle("containerStyles")}>
          {childToRender}
        </div>
      </div>
    );

  }
}


TabbedContainer.propTypes = propTypes;

export default Radium(TabbedContainer);
