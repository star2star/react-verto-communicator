let _instance;

class CallHistoryService {
  constructor(){
    this.history = {};
  }

  add(objCallHistory){
    //console.log('CHS: add', objCallHistory);
    if (!this.history[objCallHistory.callerId]){
      this.history[objCallHistory.callerId] = [];
    }
    this.history[objCallHistory.callerId] = [].concat(objCallHistory, this.history[objCallHistory.callerId]);
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
    return [ ...this.history[callerId]];
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
