import React from 'react';
import { Link } from 'react-router'

class Home extends React.Component {

  render(){
    return (
      <div>
        <Link to="/" activeClassName="active" >Home</Link>
        <Link to="/about" activeClassName="active" >About</Link>
        <Link to="/dial" activeClassName="active" >Dial</Link>
        <Link to="/incoming/411" activeClassName="active" >Incoming</Link>
        <Link to="/settings" activeClassName="active" >Settings</Link>
        <Link to="/auth/login" activeClassName="active" >Login</Link>
        <Link to="/auth/logout" activeClassName="active" >Logout</Link>
        <Link to="/contributors" activeClassName="active" >Contributors</Link>
        {this.props.children}
      </div>
    );
  }
}

export default Home;
