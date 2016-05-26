const doSubmitLogin = (data) => {
  return {
    type: 'AUTH_SUBMIT_LOGIN',
    data: data
  };
};

const doGetLoginSettings = (data) => {
  return {
    type: 'AUTH_GET_SETTINGS',
    data: data
  };
};

export { doSubmitLogin, doGetLoginSettings };
