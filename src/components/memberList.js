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

class MemberList extends VertoBaseComponent {
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
        maxHeight: '100%', // need this so list will scroll on overflow...
        overflowY: 'auto',
        cursor: 'pointer'
      }
    };

    return styles[styleName];
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
              /> );
          })}
        </div>
      );
  }
}

MemberList.propTypes = propTypes;

export default MemberList;
// reviewed on 7/14/2016
