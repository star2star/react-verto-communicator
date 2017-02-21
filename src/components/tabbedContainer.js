import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Radium from 'radium';
import { fromJS } from "immutable";



class TabbedContainer extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {activeTabIndex: this.props.activeTab ? this.props.activeTab : 0};
  }

  static propTypes = {
    activeTab: React.PropTypes.number,
    compStyle: React.PropTypes.object,
    tabLabels: React.PropTypes.array
  };

  static defaultProps = {
    tabLabels: []
  };

  static filename = "tabbedContainer";
  static displayName = "TabbedContainer";

  handleTabClick(index) {
    this.setState({...this.state, activeTabIndex: index});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
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
        flex: '1',
        display: 'flex',
        color: '#9b9b9b',
        flexDirection: 'row',
        textTransform: 'uppercase',
        fontWeight: '500',
        paddingLeft: '20px',
        paddingTop: '5px',
        justifyContent: 'center'

      },
      containerStyles: {
        flex: '1', // this flex item will grow/shrink within tabbedContainerWrap column
        overflow: 'hidden' // need this so that the chat list and memberlist will scroll on overflow
      }

    };

    return styles[styleName];
  }

  render(){
    const childToRender = React.Children.toArray(this.props.children)[this.state.activeTabIndex];

    // console.log('############### props from child', childToRender.props);
    return(
      <div className="tabbedContainerWrap" style={this.getStyle("wrapStyles")}>
        <div style={this.getStyle("mainStyles")} >
          {this.props.tabLabels.map((label, index)=>{
            const handleTabOnClick = ()=>{this.handleTabClick(index);}

            let theStyle=this.getStyle("tabStyles");
            if (index == this.state.activeTabIndex) {
              theStyle = {...theStyle, color: "#1194f6", borderBottom: "2px solid #1194f6"};
            }
            return(
              <div key={index} style={theStyle} onClick={handleTabOnClick}>{label}</div>
            );
          })}
        </div>
        <div className="selTabContainer" style={this.getStyle("containerStyles")}>
          {childToRender}
        </div>
      </div>
    );

  }
}

export default Radium(TabbedContainer);
// reviewed on 7/14/2016
