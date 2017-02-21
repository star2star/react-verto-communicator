import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from "react-router";
//import routes from './routes';
import Main from './routes/index.js';
import App from './routes/app.js'
// import AppLogin from './routes/login';
// import ResetPassword from './routes/resetPassword';
// import LoggedIn from './routes/loggedIn';
// import Container from './routes/container';
// import Dialing from './routes/dialing';
// import CallInProgress from './routes/callInProgress';
// import InitiateTransfer from './routes/initiateTransfer';
// import AttendedTransfer from './routes/attendedTransfer';

const Root = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="app" component={Main} />
    </Route>
  </Router>
);

export default Root;

//routes={routes}

//<IndexRoute component={Main} />


// <Route path="/" component={Main}>
// </Route>


//<Router history={browserHistory} routes={routes} />

//   <Router history={browserHistory}>
  //   <Route path="/" component={App}>
  //     <IndexRoute component={Main} />
  //     <Route path="app" component={Main}>
  //       <Route path="splash" component={Splash} /> // ></Route> //subroute: type
  //
  //       <Route path="login" component={AppLogin} />
  //       <Route path="resolutionRefresh" component={ResolutionRefresh} /> //rename path to resRefresh
  //       <Route path="loggedIn" component={LoggedIn} />
  //       <Route path="speedTest" component={SpeedTest} />
  //       <Route path="dialing" component={Dialing} />
  //       <Route path="callInProgress" component={CallInProgress} />
  //     </Route>
  //   </Route>
  // </Router>
