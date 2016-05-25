const doSubmitSettings = (data) => {
  return {
    type: 'APP_SUBMIT_SETTINGS',
    data: data
  };
};

const doGetSettings = (data) => {
  return {
    type: 'APP_GET_SETTINGS',
    data: data
  };
};

export { doSubmitSettings, doGetSettings };
