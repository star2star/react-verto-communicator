import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ReactDOM from 'react-dom';
import MemberItem from './memberItem';
import { fromJS } from "immutable";


class MemberList extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.closeAllAdminControls = this.closeAllAdminControls.bind(this);
  }

  static propTypes = {
    allowPresenter : React.PropTypes.bool,
    cbControlClick : React.PropTypes.func,
    hasMultipleCanvases : React.PropTypes.bool,
    members : React.PropTypes.array,
    isModerator: React.PropTypes.bool,
    compStyle : React.PropTypes.object
  };

  static defaultProps = {
    cbControlClick : ()=>{}
  };

  static filename = "memberList";
  static displayName = "MemberList";

  componentDidUpdate() {
    // scroll to bottom of message list
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  componentDidMount() {
    // scroll to bottom of message list
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      MLStyles : {
        flex: 1,
        borderLeft: '1px solid #d1d1d1',
        maxHeight: '100%', // need this so list will scroll on overflow...
        overflowY: 'auto',
        cursor: 'pointer'
      }
    };

    return styles[styleName];
  }

  closeAllAdminControls (member) {
  //console.log(member.name);
  if (this.state.memWithOpenControls == member.name) {
    this.setState({...this.state, memWithOpenControls: undefined });
  } else {
    this.setState({...this.state, memWithOpenControls: member.name});
  }
  }


  render(){
    //console.log('---- ', this.props.members);
    return(
        <div className="memberList" style={this.getStyle('MLStyles')}>
          {this.props.members.map((mem, index)=>{
            return (
              <MemberItem
                  key={index}
                  member={mem}
                  controlSettings={{
                    moderator: this.props.isModerator,
                    multCanvas: this.props.hasMultipleCanvases,
                    allowPresenter: this.props.allowPresenter
                  }}
                  cbControlClick={this.props.cbControlClick}
                  cbControlClick={this.props.cbControlClick}
                  cbOpenAdminControls={this.closeAllAdminControls}
                  showAdminControls = {this.state.memWithOpenControls == mem.name ? true : false}
              /> );
          })}
        </div>
      );
  }
}

export default MemberList;
// reviewed on 7/14/2016
