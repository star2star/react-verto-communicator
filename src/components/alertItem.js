import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ControlItem from './controlItem';


const propTypes = {
  alertData: React.PropTypes.object.isRequired,
  cbDismissAlert : React.PropTypes.func.isRequired,
  compStyle : React.PropTypes.object,
  index : React.PropTypes.number
};

export default class AlertItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  componentDidMount() {
    // set timeout for removing the alert from list after 5 seconds
    this.alertTimeout = setTimeout(()=>{
      this.props.cbDismissAlert(this.props.alertData.id);
    }, 5000);
  }


  handleDismissClick() {
    clearTimeout(this.alertTimeout);
    this.props.cbDismissAlert(this.props.alertData.id);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      alertItemStyles : {
        display: 'flex',
        border: '1px solid #d1d1d1',
        borderRadius: '5px',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
        marginBottom: '10px'
      },
      headingStyles: {
        display: 'flex',
        justifyContent: 'space-between'


      },
      compStyle : {
        controlStyle: {
          flex: 1
        }
      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  render(){
    //console.log('---- ', this.props.alertData);
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
        <div style={this.getStyle('alertItemStyles')}>
          <div style={{...this.getStyle('headingStyles'), ...headingbgColor }}>
            {this.props.alertData.summary}
            <ControlItem type="RemoveIconSVG" cbActionClick={this.handleDismissClick} />
          </div>
          {this.props.alertData.detail}
        </div>
      );
  }
}

AlertItem.propTypes = propTypes;
