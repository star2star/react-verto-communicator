import React from 'react';
import { Link } from 'react-router'

class App extends React.Component {
  render(){
    return (
      <div>
        <Link to="/" activeClassName="active" >Home</Link>&nbsp;
        <Link to="/login" activeClassName="active" >Login</Link>&nbsp;
        <Link to="/dial" activeClassName="active" >Dial</Link>&nbsp;
        <Link to="/session" activeClassName="active" >Session</Link>&nbsp;
        {this.props.children}
      </div>);

  }
}

export default App;
