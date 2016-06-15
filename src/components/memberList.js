import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ReactDOM from 'react-dom';
import MemberItem from './memberItem';

const propTypes = {
  allowPresenter : React.PropTypes.bool,
  cbControlClick : React.PropTypes.func.isRequired,
  hasMultipleCanvases : React.PropTypes.bool,
  members : React.PropTypes.array,
  isModerator: React.PropTypes.bool,
  compStyle : React.PropTypes.object
};

export default class MemberList extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

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

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      MLStyles : {
        flex: 1,
        borderLeft: '1px solid #d1d1d1',
        backgroundColor: '#FAFAFA',
        maxHeight: '100%', // need this so list will scroll on overflow...
        overflowY: 'auto'
      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }



  render(){
    //console.log('---- ', this.props.members);
    const members = this.props.members.map((mem, index)=>{
      return (<MemberItem key={index} member={mem}
          controlSettings={{moderator: this.props.isModerator, multCanvas: this.props.hasMultipleCanvases, allowPresenter: this.props.allowPresenter}}
          cbControlClick={this.props.cbControlClick}/> );
    });

    return(
        <div className="memberList" style={this.getStyle('MLStyles')}>
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
        {members}
          {members}
        </div>
      );
  }
}

MemberList.propTypes = propTypes;
