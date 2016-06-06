import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Radium from 'radium';

const propTypes = {
  compStyle: React.PropTypes.object,
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  avatar: React.PropTypes.string
};

class ContributorsList extends VertoBaseComponent{

  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
      const styles = {

            totalStyle: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "wrap",
            },

            imageStyle: {
              borderRadius: "50%"
            },

            infoStyle: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "50%"
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
          <span >
            <img src={this.props.avatar} style={this.getStyle('imageStyle')}/>
          </span>
          <span style={this.getStyle('infoStyle')}>
            <span style={this.getStyle('nameStyle')}>
              {this.props.name} <br />
            </span>
              {this.props.email}
          </span>
      </div>
    );
  }
}


ContributorsList.propTypes = propTypes;

export default Radium(ContributorsList);
