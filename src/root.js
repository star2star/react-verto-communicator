import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from "react-router";
//import routes from './routes';

import App from './routes/app.js'
import CallInProgress from './routes/callInProgress';
import AppDialing from './routes/dialing';
import LoggedIn from './routes/loggedIn';
import AppLogin from './routes/login';
import Main from './routes/main.js';
import ResolutionRefresh from './routes/resolutionRefresh';
import SpeedTest from './routes/speedTest';
import AppSplash from './routes/splash';


const Root = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="app" component={Main}>
        <Route path="callInProgress" component={CallInProgress} />
        <Route path="dialing" component={AppDialing} />
        <Route path="loggedIn" component={LoggedIn} />
        <Route path="login" component={AppLogin} />
        <Route path="resolutionRefresh" component={ResolutionRefresh} />
        <Route path="speedTest" component={SpeedTest} />
        <Route path="splash/:type" component={AppSplash} />
      </Route>
    </Route>
  </Router>
);

export default Root;

 // ></Route> //subroute: type

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
