const callInfo = (state, action)=>{

  if (typeof state === 'undefined') {
    return  {
              lastNumber: undefined,
              currentCallId: undefined,
              incomingCalls: {},
              activeCalls: {}
            };
  }
  const oStateReturn = { ...state };

  switch (action.type) {
    case 'CALLING':
      oStateReturn.lastNumber = action.data.destination;
      oStateReturn.currentCallId = action.data.callId;
      oStateReturn.activeCalls[action.data.callId] = action.data;
      // remove it from incoming if you answered it
      if (oStateReturn.incomingCalls && oStateReturn.incomingCalls[action.data.callId] ){
        // delete
        delete oStateReturn.incomingCalls[action.data.callId];
      }
      return oStateReturn;
    case "INCOMING_CALL":
      oStateReturn.incomingCalls[action.data.callId] = action.data;
      return oStateReturn;
    case "CONFERENCE_DATA":
      //console.log('<<<<', state, action.data );
      // did i call in or is it incoming

      // TODO ta - is this the right place for this?
      // console.log('@@@@@@@@@  Init messages array', Object.keys(action.data) );
      // if (Object.keys(action.data).filter((key)=>{return(key=="messages");}).length === 0) {
      //   console.log('/\/\/\/\/\/\/  Init messages array', Object.keys(action.data));
      //    action.data['messages']=[];
      // }

      if (state.activeCalls[action.data.callId] ) {
        oStateReturn.activeCalls[action.data.callId]["conferenceData"] = { ...oStateReturn.activeCalls[action.data.callId]["conferenceData"], ...action.data};
      }

      return oStateReturn;
    case 'CALL_HUNG_UP':
      // is it a number I called
      if (state.activeCalls[action.data.callID]){
        // only hangup numbers i know about
        // remove it
        if (action.data.callID === oStateReturn.currentCallId) {
          oStateReturn.currentCallId = undefined;
        }
        delete oStateReturn.activeCalls[action.data.callID];
      }

      //console.log('aaaaaaahhhhhh bbbbaaadddd', action.data);
      return oStateReturn;

    case 'RECEIVED_CHAT_MESSAGE':
      //console.log('<<<<< CHAT: ', oStateReturn, action.data, oStateReturn.activeCalls[action.data.callID], oStateReturn.activeCalls[action.data.callID] && oStateReturn.activeCalls[action.data.callID].conferenceData   );
      if (oStateReturn.activeCalls[action.data.callID] && oStateReturn.activeCalls[action.data.callID].conferenceData ) {
        // ok have conference
        if (!oStateReturn.activeCalls[action.data.callID].conferenceData.messages) {

          // first message
          oStateReturn.activeCalls[action.data.callID].conferenceData.messages = [];
        }

        //TODO  Build out chat messages object so it can be rendered nicely
        // For now, just key all the proper data into it...
        // displayName, isMe, bgColor, utc_timestamp,
        console.log('#####action.data', action.data);
        action.data = {...action.data, displayName: "DisplayName", isMe: false, bgColor: "#dee", utc_timestamp: action.data.timestamp };


        // now append it append
        oStateReturn.activeCalls[action.data.callID].conferenceData.messages = oStateReturn.activeCalls[action.data.callID].conferenceData.messages.concat([action.data]);
        //console.log('<<<***** ', oStateReturn.activeCalls[action.data.callID]);

      } else {
        console.log('hmmm no conference on receive a chat message weird');
      }
      return oStateReturn;
    default:
     return oStateReturn;
    }
};

export { callInfo };
