import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
//borfer radius

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
      imageStyle: {
         borderRadius: 300
      }
    };

    return (styles[styleName]);
  }

  render() {
    console.log(this.props.avatar);
    return (
      <div>
        <img src={this.props.avatar} style={this.getStyle('imageStyle')} />
        <div>
          {this.props.name}
        </div>
        <div>
          {this.props.email}
        </div>
      </div>
    );
  }
}


ContributorsList.propTypes = propTypes;

export default ContributorsList;
