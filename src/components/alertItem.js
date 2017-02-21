import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ControlItem from './controlItem';
import { fromJS } from "immutable";


class AlertItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  static propTypes = {
    alertData: React.PropTypes.object,
    cbDismissAlert : React.PropTypes.func,
    compStyle : React.PropTypes.object,
    index : React.PropTypes.number
  };

  static defaultProps = {
    alertData: {},
    cbDismissAlert : ()=>{},
  };

  static filename = "alertItem";
  static displayName = "AlertItem";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentDidMount() {
    // set timeout for removing the alert from list after 5 seconds
    this.alertTimeout = setTimeout(()=>{
      this.props.cbDismissAlert(this.props.alertData.id);
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.alertTimeout);
  }

  handleDismissClick() {
    clearTimeout(this.alertTimeout);
    this.props.cbDismissAlert(this.props.alertData.id);
  }

  getDefaultStyle(styleName) {
    const styles = {
      alertItemStyles : {
        display: 'flex',
        border: '1px solid #d1d1d1',
        borderRadius: '5px',
        backgroundColor: '#FFF',
        flexDirection: 'column',
        marginBottom: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.1) -5px 3px 0px -4px, rgba(0, 0, 0, 0.219608) 0px 3px 7px 0px'
      },
      headingStyles: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 3px 10px 10px',
        borderRadius: '4px 4px 0px 0px'
      },
      compStyle : {
        controlStyle: {
          flex: 1
        }
      },
      alertDetailStyle : {
        padding:'5px 3px 5px 10px',
        display:'flex',
        alignItems:'center',
        fontSize: '.85rem',
        backgroundColor: '#EEE',
        borderRadius: '0px 0px 4px 4px'
      }
    };

    return styles[styleName];
  }

  render(){
    // console.log('--------------> ', this.props.alertData);
    let headingbgColor;
    switch (this.props.alertData.level) {
      case 'error':
        headingbgColor = {backgroundColor: '#FD5F56'};
        break;
      case 'warn':
        headingbgColor = {backgroundColor: '#FFC02F'};
        break;
      case 'info':
      default:
        headingbgColor = {backgroundColor: '#63B653'};
  }

    return(
        <div className="item container" style={this.getStyle("alertItemStyles")}>
          <div className="summary" style={{...this.getStyle("headingStyles"), ...headingbgColor }}>
            {this.props.alertData.summary}
            <ControlItem type="RemoveIconSVG" cbActionClick={this.handleDismissClick} />
          </div>
          <div className="detail" style={this.getStyle("alertDetailStyle")}>
            {this.props.alertData.detail}
          </div>
        </div>
      );
  }
}


export default AlertItem;
// reviewed 7/13/2016
