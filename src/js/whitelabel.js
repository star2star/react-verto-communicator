const data = require("./whitelabelData.js");

export default class WhiteLabel {
  static get(id) {
    if (data[id]) {
      return data[id];
    } else {
      console.error(`Missing Key ${id} from whitelabel.json`);
    }
  }
}
