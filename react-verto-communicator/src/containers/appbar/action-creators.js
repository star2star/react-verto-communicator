const doSubmitSettings = (data) => {
  return {
    type: 'APP_SUBMIT_SETTINGS',
    data: data
  };
};

const doUpdateSetting = (settingObj) => {
  return {
    type: 'APP_UPDATE_SINGLE_SETTING',
    data: settingObj
  };
};

const doGetSettings = (data) => {
  return {
    type: 'APP_GET_SETTINGS',
    data: data
  };
};

export { doSubmitSettings, doUpdateSetting, doGetSettings };
