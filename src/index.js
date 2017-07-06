import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable import/no-extraneous-dependencies */
import { AppContainer } from 'react-hot-loader'; // TODO must works only in dev enviroment
/* eslint-enable import/no-extraneous-dependencies */
import { StyleRoot } from 'radium';
import { createStore, applyMiddleware, compose } from 'redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import VertoService from './js/vertoService';
import reducer from './containers/reducers';
import Messages from './js/messages';
import Root from './root';
import {
  doValidation,
  doLogOut,
  doVertoLogin,
  doMakeCallError,
  doHungUp,
  doCallHeld,
  doingMakeCall,
  doIncomingCall,
  doConferenceData,
  doReceiveChat,
} from './containers/main/action-creators';
import AlertService from './js/alertService';

// TODO where will this set and managed when this releas??
// Set styling theme globally? partilay in vertobasecomponent
/*
window.theme = {
  value: 'default',
};
*/
// TODO must works only in dev enviroment
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* const preloadedState = window.__PRELOADED_STATE__; */
/* eslint-enable no-underscore-dangle */
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// const store = createStore(reducer, applyMiddleware(thunk));

let locale;
let messages;
let dialect;
let localeData;

dialect = store.getState().app.settings.language.id;
locale = dialect;
// dialect = Messages.getDialect(locale);

messages = new Messages(dialect).getAllMessages();

// console.log('##########', messages);
// needed for INTL
localeData = require(`react-intl/locale-data/${dialect}`);
addLocaleData(localeData);

// move language into here
store.subscribe(() => {
  const newLocale = store.getState().app.settings.language.id;
  if (dialect && dialect !== newLocale) {
    // console.log('it changed ', locale, newLocale, dialect);
    locale = newLocale;

    dialect = Messages.getDialect(locale);

    messages = new Messages(locale).getAllMessages();

    // console.log('##########', messages);
    // needed for INTL
    // Does it required dinamicly ?
    localeData = require(`react-intl/locale-data/${dialect}`);
    addLocaleData(localeData);
    location.reload(true);
  }
});

/* const subId = */ VertoService.getInstance().subscribe((event, status, data) => {
  // console.log('>>>> Subscription: ', event, status, data)
  switch (event) {
    case 'loggedIn':
      store.dispatch(doVertoLogin(status, data));
      break;
    case 'logout':
      store.dispatch(doLogOut());
      break;
    case 'make-call':
      store.dispatch(doingMakeCall(status, data.number, data.callID, data.name));
      break;
    case 'makeCallError':
      store.dispatch(doMakeCallError(data));
      break;
    case 'make-call-active':
    case 'recovering':
      store.dispatch(
        doingMakeCall(
          status,
          data.direction.name === 'outbound'
            ? data.params.destination_number
            : data.params.caller_id_number,
          data.callID,
          data.direction.name,
        ),
      );
      break;
    case 'callHeld':
      store.dispatch(doCallHeld(data));
      break;
    case 'chat-received':
      store.dispatch(doReceiveChat(data));
      break;
    case 'conferenceData':
      store.dispatch(doConferenceData(data));
      break;
    case 'hangup':
      store.dispatch(doHungUp(data));
      break;
    case 'showAlert':
      AlertService.getInstance().createAlert(data);
      break;
    case 'incoming-call':
      //console.log('this.props.app', this.props.app);
      store.dispatch(doIncomingCall(data));
      break;

    // Add handlers there
    default:
      console.log('>>> Subscription Not Handled:', event, data);
  }
});

store.dispatch(doValidation());

const rootEl = document.getElementById('app');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <StyleRoot>
            <Component />
          </StyleRoot>
        </IntlProvider>
      </Provider>
    </AppContainer>,
    rootEl,
  );

render(Root);
if (module.hot) module.hot.accept('./root', () => render(Root));
