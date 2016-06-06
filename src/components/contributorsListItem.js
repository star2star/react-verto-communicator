import React from 'react';
import VertoBaseComponent from './vertobasecomponent';


const propTypes = {
  compStyle: React.PropTypes.object,
  contributorsObject: React.PropTypes.object
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
        <div> REEEE </div>
        <div> REEEE </div>
      </div>
    );
  }
}


ContributorsList.propTypes = propTypes;

export default ContributorsList;
