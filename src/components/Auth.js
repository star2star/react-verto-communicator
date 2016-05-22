import React from 'react';

class Auth extends React.Component {

  render(){
    //console.log(this.props)
    return (
      <div>Auth - {this.props.route.path.indexOf('login') > -1 ? 'Login': 'Logout'}</div>
    );
  }
}

export default Auth;
