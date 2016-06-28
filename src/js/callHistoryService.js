let _instance;

class CallHistoryService {
  constructor(){
    let lsHistory;
    if (localStorage) {
      lsHistory = JSON.parse(localStorage.getItem('history'));
    }
    this.history = { ...lsHistory };
  }

  add(objCallHistory){
    //console.log('CHS: add', objCallHistory);
    if (!this.history[objCallHistory.callerId]){
      this.history[objCallHistory.callerId] = [];
    }
    this.history[objCallHistory.callerId] = [].concat(objCallHistory, this.history[objCallHistory.callerId]);
    if (localStorage) {
      localStorage.setItem('history', JSON.stringify(this.history));
    }
  }
  clearHistory(){
    console.log('clear method running hopefully');
    this.history = {};
  }
  getHistory(){
    // converting object to array and sorting descending on lasttimestamp
    return Object.keys(this.history).map((callerId)=>{
      return {
        callerId: callerId,
        lastDirection: this.history[callerId][0].direction,
        lastTimestamp: this.history[callerId][0].timestamp,
        nbrCalls: this.history[callerId].length
      };
    }).sort((a,b)=>{
      return a.lastTimestamp < b.lastTimestamp;
    });
  }

  getHistoryDetail(callerId){
    // return a new array
    if(callerId && this.history[callerId]){
      return [ ...this.history[callerId]];
    } else {
      return [];
    }
  }

  static getInstance() {
    if (!_instance) {
      _instance = new CallHistoryService();
    }

    return _instance;
  }

}

//exporting
export default CallHistoryService;
