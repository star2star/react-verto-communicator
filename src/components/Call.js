import React from 'react';

class Call extends React.Component {

  render(){
    //console.log(this.props.params)
    return (
      <div>Incoming from: {this.props.params.nbr}</div>
    );
  }
}

export default Call;
