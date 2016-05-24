export default class Messages {
  constructor(aLocale="en-US") {
    this.locale = aLocale;
    var req = require.context("../messages", true, /^\.\/.*\.json$/);
    //console.log('------->', aLocale);
    this.msg = {};
    const self = this;
    req.keys().forEach((msgFile) => {
      //console.log('aaaaaaa',msgFile);
      const msgF = msgFile.substring(2);
      if (msgF.indexOf(aLocale) > -1) {
        const msgData = require(`json!../messages/${msgF}`);
        //console.log(msgFile + "data is: ", msgData);
        msgData.forEach(function(msgObject){
            self.msg[msgObject['id']] = msgObject['value'];
        });
      }

    });
     //console.log('-----', this.msg);
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
