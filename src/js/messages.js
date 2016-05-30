const DIALECTS = {
    'en': 'en',
    'en-GB': 'en',
    'en-US': 'en',
    'it': 'it',
    'it-IT': 'it',
    'fr': 'fr',
    'fr-FR': 'fr',
    'fr-CA': 'fr',
    'pt': 'pt',
    'pt-BR': 'pt',
    'pt-PT': 'pt',
    'de': 'de',
    'de-DE': 'de',
    'es': 'es',
    'es-ES': 'es',
    'pl': 'pl',
    'pl-PL': 'pl',
    'ru': 'ru',
    'ru-RU': 'ru',
    'sv': 'sv',
    'sv-SV': 'sv',
    'sv-FI': 'sv',
    'da': 'da',
    'da-DK': 'da',
    'id': 'id',
    'id-ID': 'id',
    'zh': 'zh',
    'zh-CN': 'zh',
    'zh-TW': 'zh',
    'zh-HK': 'zh'
}

export default class Messages {
  constructor(aLocale="en-US") {
    this.locale = aLocale;
    this.dialect = DIALECTS[this.locale];
    //const localeFile = 'locale-' + this.dialect;
    //console.log('^^^^^^', this.locale, DIALECTS, this.dialect);

    var req = require.context("../locales", true, /^\.\/.*\.json$/);
    //var req = require.context("../messages", true, /^\.\/.*\.json$/);
    //console.log('------->', aLocale);
    this.msg = {};

    req.keys().forEach((msgFile) => {
      //console.log('aaaaaaa',msgFile);
      const msgF = msgFile.substring(2);
      if (msgF.indexOf(this.dialect) > -1) {
      //if (msgF.indexOf(this.locale) > -1) {
        //const msgData = require(`json!../messages/${msgF}`);
        const msgData = require(`json!../locales/${msgF}`);
        //console.log(msgFile + "data is: ", msgData);
        msgData.forEach((msgObject)=>{
          //console.log('-----', msgObject);
          //this.msg[msgObject['id']] = msgObject['value'];
          this.msg = msgObject;
        });
        //console.log('-----', this.msg);
      }

    });

  }

  getAllMessages(){
    return this.msg;
  }

  get(id) {
    if (this.msg[id]) {
      return this.msg[id];
    } else {
      console.error(`Missing Key ${id} from Messages`);
    }
  }
}
