import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';
import CallHistoryService from '../js/callHistoryService';
import { UpArrowIconSVG, DownArrowIconSVG, RemoveIconSVG, BackArrowIconSVG } from './svgIcons';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Radium  from 'radium';
import {TransitionMotion, Motion, spring} from 'react-motion';

const propTypes = {
  compStyle : React.PropTypes.object,
  history : React.PropTypes.array,
  cbClearHistory : React.PropTypes.func.isRequired,
  cbCall : React.PropTypes.func,
  allowToolTip : React.PropTypes.bool,
  cbBack: React.PropTypes.func.isRequired,
  callerId : React.PropTypes.string
};

const defaultProps = {
  allowToolTip : false
};

const springSettings = {stiffness: 170, damping: 26};
const NEXT = 'show-next';


class CallHistory extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = { items: [], item: [[500, 350], [800,600]], currItem: 0, callDetailDisplayed : false, callItem: ''};

    this.willLeave = this.willLeave.bind(this);
    this.willEnter = this.willEnter.bind(this);
    //this.clickHandler = this.clickHandler.bind(this);
    this.generateHistory = this.generateHistory.bind(this);
    this.generateDetails = this.generateDetails.bind(this);
    this.showDetails = this.showDetails.bind(this);
}

  componentDidMount() {
    this.showHistory();
  }

  handleChange({target: {value}}) {
    this.setState({...this.state, currItem: value});
  }

  clickHandler() {
    if(this.state.currItem == 0) {
      this.setState({...this.state, currItem : 1 });
    } else {
      this.setState({...this.state, currItem: 0 });
    }
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        alignContent: 'stretch',
        borderRadius: '3px',
        justifyContent: 'flex-start',
        flexDirection: "column",
        height: '500px',
        minWidth: '225px', // allows animation to go in/out further without clashing 'Call History' and 'Clear History'
        overflowY: 'auto',
        overflowX: 'hidden',
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
        color: "#4a4a4a"
      },
      headerCont: {
        width: '100%'
      },
      header: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        paddingLeft: '5px',
        paddingRight: '15px',
        justifyContent: 'stretch',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        fontWeight: 300,
        height: '40px',
        backgroundColor: '#eee'
      },
      headerSvgs : {
        cursor: 'pointer',
        fill: "#4a4a4a",
        width: '24px',
        height: '24px'
      },
      rmvHistory : {
        marginLeft: 'auto',
        cursor: 'pointer'
      },
      body : {
        width: '100%',
        maxHeight: '500px',
        overflowY: 'auto',
        overflowX: 'hidden'
      },
      dir : {
        fill: '#009688',
        width: '24px',
        height: '24px'
      },
      details: {
        display: 'flex',
        minWidth: '375px',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#ccc',
        fontSize: '12px'
      },
      noCallDetails: {
        display: 'flex',
        height: '100px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 300,
        color: '#4a4a4a'
      }
     };

    return (styles[styleName]);
  }

  willLeave() {
    return {width: spring(0) };
  }
  willEnter(){
    return {width: 0 };
  }
  removeItem(control){
    var x = { ...this.state };
    x.items = x.items.filter((i)=>i.key != control  );

    this.setState( x);
  }

  showDetails() {
    //console.log('in showDialpad method');
    var x = { ...this.state };
    x.items.push({key: "de", size: spring(375) });
    this.setState(x);
  }

  showHistory() {
    //console.log('cccccaaallll history showing ')
    var x = { ...this.state };
    x.items.push({key: "hi", size: spring(375) });
    //console.log('xxxxxx', x);
    this.setState(x);
  }

  generateDetails(config) {
    const self = this;
    let details;
    const detailData = CallHistoryService.getInstance().getHistoryDetail(this.callerId);
    details = detailData.map(function(i, key){
      let renderedDirection;
      if(i.direction == 'outgoing') {
        renderedDirection = (
          <span className="outgoing" >
            <UpArrowIconSVG svgStyle={{...self.getDefaultStyle('dir')}} />
          </span>);
      } else {
        renderedDirection = (
          <span className="incoming">
            <DownArrowIconSVG svgStyle={{...self.getDefaultStyle('dir')}} />
          </span>);
      }

      const formattedTimestamp = moment(i.timestamp).format('ddd MMM DD YYYY HH:mm:ss A');
      const d1 = config.style.width < 150 ? 'none': 'block';
      return (
        <div
            className="body"
            tabIndex="0"
            style={{...self.getDefaultStyle('body'), ...config.style, display: d1 }}
        >
            <div
                className="details"
                key={config.key}
                onClick={()=>{
                  self.props.cbCall(i.callerId);
                }}
                style={{...self.getDefaultStyle('details')}}
            >
              {renderedDirection}
              {formattedTimestamp}
            </div>
        </div>
      );
    });
    return details;
  }

  generateHistory(config) {
    let listitems;
    const d1 = config.style.width < 250 ? 'none': 'block';
    if(this.props.history.length > 1){
    listitems = this.props.history.map((i)=>{
        return(
        <div
            className="body"
            tabIndex="0"
            style={{...this.getDefaultStyle('body'), ...config.style, display: d1}}
        >
            <CallHistoryItem
                allowToolTip = {this.props.allowToolTip}
                className="chi"
                key={config.key}
                data={i}
                cbClick={()=>{
                  this.props.cbCall(i.callerId);
                }}
                cbShowCalls={()=>{
                  this.callerId = i.callerId;
                  this.removeItem('hi');
                  setTimeout(()=>this.showDetails(),1000);
                  setTimeout(()=>this.setState({...this.state, 'callDetailDisplayed' : true}),1000);
                }}
            />
        </div>
        );
      });
    } else {
      listitems = (
        <div
            className="noCalls"
            style={{...this.getDefaultStyle('noCallDetails'), ...config.style}}
        >
            <span>
              No calls to show.
            </span>
        </div>
      );
    }
    return listitems;
  }

  render(){

    console.log('current item',this.state.currItem);

    let icon;
    if(this.state.callDetailDisplayed) {
      icon =(
        <span
          onClick={()=>{
            setTimeout(()=>this.setState({...this.state, 'callDetailDisplayed': false}),1000);
            this.removeItem('de');
            setTimeout(()=>this.showHistory(),1000);
          }}
        >
          <BackArrowIconSVG svgStyle={{...this.getDefaultStyle('headerSvgs')}} />
        </span>
      );
    } else {
      icon = (
        <span
            onClick={this.props.cbBack}
            tabIndex="0"
        >
            <RemoveIconSVG svgStyle={{...this.getDefaultStyle('headerSvgs')}} />
        </span>
      );
    }


    let clearHistory;
    if(this.state.callDetailDisplayed) {
      clearHistory = (<span></span>);
    } else {
      if(this.props.history.length > 0) {
        clearHistory = (
          <span
              className="rmvHistory"
              style={{...this.getDefaultStyle('rmvHistory')}}
              onClick={this.props.cbClearHistory}
              tabIndex="0"
          >
              <FormattedMessage
                  id="CLEAR_CALL_HISTORY"
              />
          </span>
        );
      } else {
        clearHistory = (<span></span>);
      }
    }

    let title;
      if(this.state.callDetailDisplayed) {
        title = (
          <span
              className="title"
              style={{...this.getDefaultStyle('title')}}
          >
            {this.callerId}
        </span>);
      } else {
        title = (
          <span
              className="title"
              style={{...this.getDefaultStyle('title')}}
          >
            <FormattedMessage
                id="CALL_HISTORY"
            />
        </span>);
      }

    var nStyles = this.state.items.map(item => {
      var x = {
        key: item.key,
        style: {width: item.size }
      };
      return (x);
    });

    // animation hell
    const {item, currItem} = this.state;
    //console.log('animation hell', item, currItem);
    const [currWidth, currHeight] = item[currItem];
    //console.log('kill yourself',currWidth, currHeight);

    const widths = item.map(([origW, origH])=> currHeight / origH * origW);
    //console.log('widths',widths);

    const leftStartCoords = widths
      .slice(0, currItem)
      .reduce((sum,width) => sum-width, 0);
    //console.log('Left Start Coords',leftStartCoords);

    let configs = [];
    item.reduce((prevLeft, [origW, origH], i) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings)
      });
      return prevLeft + widths[i];
    }, leftStartCoords);
    //console.log('configs array',configs);



    return (
      <div
          className="container"
          style={this.getStyle('container')}
      >
        <div
            className="headerCont"
            style={{...this.getDefaultStyle('headerCont')}}
        >
          <div
              className="header"
              style={{...this.getDefaultStyle('header')}}
          >
            <span onClick={this.clickHandler.bind(this)}>Click Test</span>
              {icon}
              {title}
              {clearHistory}
          </div>
        </div>
            <TransitionMotion
                styles={nStyles}
                //willLeave={this.willLeave}
                //willEnter={this.willEnter}
            >
             {interpolatedStyles =>{
                 return (
                   <span>
                     {interpolatedStyles.map(config => {
                       if (this.state.callDetailDisplayed){
                         return this.generateDetails(config);
                       } else {
                         return this.generateHistory(config);
                       }
                    })}
                  </span>);
             }}
             </TransitionMotion>
      </div>
    );
  }

}

CallHistory.defaultProps = defaultProps;
CallHistory.propTypes = propTypes;
export default Radium(CallHistory);
