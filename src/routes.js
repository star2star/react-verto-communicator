import App from './routes/app';
//import Route from 'react-router';

// throws an error in the console if the page wasn't able to load
const errorLoading = (error) => {
  throw new Error(`Dynamic page loading failed:  ${error}`);
};

const loadRoute = (cb) => {
  return (module) => {
    cb(null, module.default);
  };
};


// Code splitting below produces the equivlent of the following route structure:
// <Route path="/" component={App}>
//   <IndexRoute component={Main} />
//   <Route path="app" component={Main}>
//     <Route path="callInProgress" component={CallInProgress} />
//     <Route path="dialing" component={AppDialing} />
//     <Route path="loggedIn" component={LoggedIn} />
//     <Route path="login" component={AppLogin} />
//     <Route path="resolutionRefresh" component={ResolutionRefresh} />
//     <Route path="speedTest" component={SpeedTest} />
//     <Route path="splash/:type" component={AppSplash} />
//   </Route>
// </Route>


export default {
  path: '/',
  component: App,
  indexRoute: {
    getComponent(location, cb) {
      System.import('./routes/main')
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
  },
  childRoutes: [
    {
      path: 'app',
      getComponent(location, cb) {
        System.import('./routes/main')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
      childRoutes: [
          {
            path: 'callInProgress',
            getComponent(location, cb) {
              System.import('./routes/callInProgress')
                .then(loadRoute(cb))
                .catch(errorLoading);
            }
          },
          {
            path: 'dialing',
            getComponent(location, cb) {
              System.import('./routes/dialing')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'loggedIn',
            getComponent(location, cb) {
              System.import('./routes/loggedIn')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'login',
            getComponent(location, cb) {
              System.import('./routes/login')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'resolutionRefresh',
            getComponent(location, cb) {
              System.import('./routes/resolutionRefresh')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'speedTest',
            getComponent(location, cb) {
              System.import('./routes/speedTest')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'splash/:type',
            getComponent(location, cb) {
              System.import('./routes/splash')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          }
        ]
    }
  ]
};
