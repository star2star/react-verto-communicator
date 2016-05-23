import React from 'react';
import { Link } from 'react-router'

class App extends React.Component {
  render(){
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dial">Dial</Link>
        <Link to="/session">Session</Link>
        {this.props.children}
      </div>);

  }
}

export default App;
