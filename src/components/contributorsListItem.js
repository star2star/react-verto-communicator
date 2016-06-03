import React from 'react';
import VertoBaseComponent from './vertobasecomponent';


const propTypes = {
  compStyle: React.PropTypes.object
};

class ContributorsList extends VertoBaseComponent{

  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }
  render() {
    console.log( this.props.contr["name"]);
    return (
      <div>
        <div>  </div>
        <div>  </div>
      </div>
    );
  }
}


ContributorsList.propTypes = propTypes;

export default ContributorsList;
