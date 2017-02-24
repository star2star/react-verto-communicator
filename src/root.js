import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from "react-router";
import routes from './routes';

// import App from './routes/app.js'
// import CallInProgress from './routes/callInProgress';
// import AppDialing from './routes/dialing';
// import LoggedIn from './routes/loggedIn';
// import AppLogin from './routes/login';
// import Main from './routes/main.js';
// import ResolutionRefresh from './routes/resolutionRefresh';
// import SpeedTest from './routes/speedTest';
// import AppSplash from './routes/splash';


const Root = () => (
  <Router history={browserHistory} routes={routes} />
);

export default Root;
