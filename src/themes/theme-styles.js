// How to add themed styles
// 1 - For each theme (light, dark, etc.) add a new object for your components
//     NOTE:  the object key must be the component name in lowercase!!
// 2 - Within the object with the key of your component, add the styles in the
//     same structure as they are defined in your component default styles.
//     You can copy and paste from your component to make sure you are accurate
// 3 - Update the style values that are relevant to the theme, and remove style
//     attributes that are not changing based on the theme.
// 4 - Repeat step 3 for each theme.

const themes = {
  light: {
    appbar: {
      appbarStyles: {
        backgroundColor: '#1e90ff',
        color: '#FFFFFF'
      },
      menu: {
        backgroundColor: '#1e90ff'
      },
      li: {
        color: '#4a4a4a'
      },
      button: {
        color: '#1e90ff'
      }
    },

    alertitem: {
      alertItemStyles:{
        border: '1px solid #d3d3d3',
        backgroundColor: '#FFFFFF'
      },
      alertDetailStyle:{
        backgroundColor: '#d3d3d3'
      }
    },

    alertlog:{
      myModal:{
        content:{
          color: '#d3d3d3'
        }
      },
      clearAlertBtnStyle:{
        backgroundColor: '#1e90ff',
        color: '#d3d3d3'
      }
    },

    badge:{
      badgeStyles:{
        backgroundColor: '#f08080'
      }
    },

    browser:{
      pageStyle:{
        color: '#d3d3d3',
      },
      headerContainerStyle:{
        backgroundColor: '#f08080'
      }
    },

    callhistory:{
      headerSvgs:{
        backgroundColor: '#d3d3d3'
      },
      dir:{
        fill: '#009688'
      },
      noCallDetails:{
        color: '#d3d3d3'
      }
    },

    callhistoryitem:{
      container:{
        color: '#d3d3d3'
      },
      top:{
        color: '#26dabb'
      },
      dirSVG:{
        fill: '#009663'
      }
    },

    callprogress:{
      timerColor:{
        color: '#d3d3d3'
      }
    },

    chatinput:{
      inputStyle:{
        color: '#d3d3d3'
      }
    },

    chatsession:{
      headerStyles:{
        color: '#d3d3d3'
      },
      chatIconStyle:{
        fill: '#d3d3d3'
      }
    },

    dialing:{
      avatarStyle:{
        fill: '#d3d3d3'
      },
      iconRowStyle:{
        backgroundColor: '#d3d3d3'
      }
    },

    dialpad:{
      container:{
        color: '#d3d3d3'
      },
      callhist:{
        fill: "#7fac43"
      },
      input:{
        color: '#d3d3d3'
      },
      left:{
        backgroundColor: '#00967c'
      },
      right:{
        backgroundColor: '#00967c'
      }
    },

    incomingcall:{
      callFromDisplay:{
        color: '#d3d3d3'
      },
      callControlStyle:{
        color: '#d3d3d3'
      },
      answerIconStyle:{
        backgroundColor: '#7fac43'
      },
      rejectIconStyle:{
        backgroundColor: '#f08080'
      }
    },

    input:{
      label:{
        color: 'f08080'
      },
      inputArea:{
        color: "#d3d3d3"
      }
    },

    login:{
      container:{
        color: '#d3d3d3'
      },
      settingsLink:{
        color: '#00966f'
      },
      verifyFields:{
        backgroundColor: '#f08080'
      },
      loginButton:{
        backgroundColor: '#7fac43'
      }
    },

    controlitem:{
      svgStyle:{
        fill: '#7cfc00'
      }
    },

    admincontrols:{
      controlIconStyle:{
        svgStyle:{
          fill: '#d3d3d3'
        }
      },
      headingStyle:{
        fill: '#d3d3d3'
      }
    },

    memberitem:{
      nameStyle:{
        color: '#d3d3d3'
      },
      svgStyle:{
        fill: '#d3d3d3'
      },
      screenShareBadgeStyle:{
        backgroundColor: '#1e90ff'
      },
      presenterBadgeStyle:{
        backgroundColor: '#1e90ff'
      }
    },

    networkstatusindicator:{
      header:{
        color: '#d3d3d3'
      }
    },

    numberitem:{
      keyValue:{
        color: '#67e5da'
      }
    },

    settingspreview:{
        saveStyle:{
          backgroundColor: '#7fac43'
        },
        refreshStyle:{
          backgroundColor: '#1e90ff'
        },
        headerStyle:{
          backgroundColor: '#0d53a1'
        }
    },

    splash:{
      loadingBarStyle:{
        backgroundColor: '#d3d3d3'
      },
      loadingBarStyle:{
        backgroundColor: '#26a584'
      }
    },

    splashmessage:{
      titleStyle:{
        color: '#d3d3d3'
      },
      bodyStyle:{
        backgroundColor: '#f08080'
      },
      errorStyle:{
        backgroundColor: '#ff69b4'
      }
    },

    adminvideocontrols:{
      controlIconStyle:{
        svgStyle:{
          fill: '#d3d3d3'
        }
      }
    },

    uservideocontrols:{
      controlIconStyle:{
        svgStyle:{
          fill: '#d3d3d3'
        }
      }
    },

    vcstatus: {
      svgStyle: {
        width: '25px',
        height: '25px'
      },
      disconnectedFill: {
        fill: "#f08080"
      },
      connectingFill: {
        fill: "white"
      },
      connectedFill: {
        fill: "#7fac43"
      }
    }
  },

  dark: {
    appbar: {
        appbarStyles: {
        backgroundColor: '#002277'
      }
    },
    vcstatus: {
      svgStyle: {
        width: '25px',
        height: '25px'
      }
    },
    app :{
      appStyles:{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: '100vh', // want to fill the whole screen height
          width: '100vw' // and fill screen width
        }
      }
  },
  custom: {
    appbar: {
        appbarStyles: {
        backgroundColor: 'green'
      }
    }
  }
};
export default themes;
