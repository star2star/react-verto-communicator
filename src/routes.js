import Container from './routes/container';
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


export default {
  path: '/',
  component: Container,
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
            path: 'login',
            getComponent(location, cb) {
              System.import('./routes/login')
                .then(loadRoute(cb))
                .catch(errorLoading);
            }
          },
          {
            path: 'resetPassword',
            getComponent(location, cb) {
              System.import('./routes/resetPassword')
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
            path: 'dialing',
            getComponent(location, cb) {
              System.import('./routes/dialing')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'callInProgress',
            getComponent(location, cb) {
              System.import('./routes/callInProgress')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'initiateTransfer',
            getComponent(location, cb) {
              System.import('./routes/initiateTransfer')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          },
          {
            path: 'attendedTransfer',
            getComponent(location, cb) {
              System.import('./routes/attendedTransfer')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
          }
        ]
    },
    {
      path: 'update',
      getComponent(location, cb) {
        System.import('./routes/update')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    }
  ]
};





// export default {
//   path: '/',
//   component: Main,
//   indexRoute: {
//     getComponent(location, cb) {
//       System.import('./routes/appmain')
//         .then(loadRoute(cb))
//         .catch(errorLoading);
//     }
//   },
//   childRoutes: [
//     {
//       path: 'app',
//       getComponent(location, cb) {
//         System.import('./routes/appmain')
//           .then(loadRoute(cb))
//           .catch(errorLoading);
//       },
//       childRoutes: [
//           {
//             path: 'login',
//             getComponent(location, cb) {
//               System.import('./routes/login')
//                 .then(loadRoute(cb))
//                 .catch(errorLoading);
//             }
//           },
//           {
//             path: 'panel1',
//             getComponent(location, cb) {
//               System.import('./routes/panel1')
//                 .then(loadRoute(cb))
//                 .catch(errorLoading);
//             },
//             childRoutes : [
//               {
//                 path: 'contacts/:tab',
//                 getComponent(location, cb) {
//                   System.import('./routes/contacts')
//                     .then(loadRoute(cb))
//                     .catch(errorLoading);
//                 }
//               },
//               {
//                 path: 'events',
//                 getComponent(location, cb) {
//                   System.import('./routes/events')
//                     .then(loadRoute(cb))
//                     .catch(errorLoading);
//                 }
//               }
//             ]
//           },
//           {
//             path: 'item/:itemtype/:id',
//             getComponent(location, cb) {
//               System.import('./routes/item')
//                 .then(loadRoute(cb))
//                 .catch(errorLoading);
//             }
//           }
//         ]
//     }
//   ]
// };
