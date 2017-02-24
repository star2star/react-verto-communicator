import React from 'react';
import ReactDOM, {server } from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import {StyleRoot} from 'radium';
import { createStore, applyMiddleware } from 'redux';
import { addLocaleData, IntlProvider} from 'react-intl';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import VertoService from './js/vertoService';
import reducer from './containers/reducers.js';
import Messages from './js/messages';
import App from './routes/app';
import Root from './root';
import {doValidation, doLogOut, doVertoLogin, doMakeCallError, doHungUp, doCallHeld,
   doingMakeCall, doIncomingCall, doConferenceData, doReceiveChat } from './containers/main/action-creators';
import AlertService from './js/alertService';

function getLanguage(){
  let sReturn = 'en-US';

  const lang = navigator.language;
  if (lang.length < 4) {
    // fix lang variable

    switch( lang.toLowerCase() ){
      case 'es':
        sReturn = 'es';

        break;
      default:
        // should be English
        break;
    }
  } else {
    sReturn = lang;
  }
  // console.log('lang:', lang);
  // console.log('language being set to: ', sReturn);
  return sReturn;
}

//TODO where will this be set and managed when this is released??
// Set styling theme globally
window.theme={ value: 'default'};



const store = createStore(reducer, applyMiddleware(thunk));

let locale, dialect, messages, localeData;


dialect = store.getState().app.settings.language.id;
locale = dialect;
//dialect = Messages.getDialect(locale);

messages = (new Messages(dialect)).getAllMessages();

//console.log('##########', messages);
// needed for INTL
localeData = require('react-intl/locale-data/'+dialect);
addLocaleData(localeData);

// move language into here
store.subscribe(()=>{
  const newLocale = store.getState().app.settings.language.id;
  if (dialect && dialect !== newLocale ){
    // console.log('it changed ', locale, newLocale, dialect);
    locale = newLocale;

    dialect = Messages.getDialect(locale);

    messages = (new Messages(locale)).getAllMessages();

    //console.log('##########', messages);
    // needed for INTL
    localeData = require('react-intl/locale-data/'+dialect);
    addLocaleData(localeData);
    location.reload(true);
  }

})

const subId = VertoService.getInstance().subscribe((event, status, data)=>{
  //console.log('>>>> Subscription: ', event, status, data)
  switch (event){
    case "loggedIn":
      store.dispatch(doVertoLogin(status, data ));
      break;
    case "logout":
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
      store.dispatch(doingMakeCall(status, (data.direction.name == 'outbound' ? data.params.destination_number : data.params.caller_id_number), data.callID, data.direction.name));
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

      //this is were I am adding things
    default:
      console.log('>>> Subscription Not Handled:', event, data);
  }
});

// console.log('verto subscriptionID:', subId);

window.theStore = store;

store.dispatch(doValidation());

//console.log('INTL: ', locale, messages);
ReactDOM.render((
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <StyleRoot>
        <Root />
      </StyleRoot>
    </IntlProvider>
  </Provider>
), document.getElementById('app'));
