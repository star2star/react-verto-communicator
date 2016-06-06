import React from 'react';
import VertoBaseComponent from './vertobasecomponent';


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
  
  render() {
    return (
      <div>
        <img src={this.props.avatar} />
      </div>
    );
  }
}


ContributorsList.propTypes = propTypes;

export default ContributorsList;
