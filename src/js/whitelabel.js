const data = require("json!./whitelabel.json");

export default class WhiteLabel {
  static get(id) {
    if (data[id]) {
      return data[id];
    } else {
      console.error(`Missing Key ${id} from whitelabel.json`);
    }
  }
}
