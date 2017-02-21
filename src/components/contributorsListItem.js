import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { fromJS } from "immutable";


class ContributorsList extends VertoBaseComponent{

  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    compStyle: React.PropTypes.object,
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    avatar: React.PropTypes.string
  };

  static defaultProps = {
    name: '',
    email: '',
    avatar: ''
  };

  static filename = "contributorsListItem";
  static displayName = "ContributorsList";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
      const styles = {

            totalStyle: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "wrap",
              marginBottom: '20px'
            },

            imageStyle: {
              borderRadius: "50%"
            },

            infoStyle: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "50%",
              wordWrap: 'break-word',
              minWidth: '165px'
            },

            nameStyle: {
              fontSize: 20,
              paddingBottom: "5px"
            }
      };
      return (styles[styleName]);
  }

  render() {
    return (
      <div style={this.getStyle('totalStyle')}>
          <span>
            <img src={this.props.avatar} style={this.getStyle('imageStyle')}/>
          </span>
          <span style={this.getStyle('infoStyle')} >
            <span style={this.getStyle('nameStyle')}>
              {this.props.name} <br />
            </span>
              {this.props.email}
          </span>
      </div>
    );
  }
}

export default ContributorsList;
// reviewed 7/13/2016
