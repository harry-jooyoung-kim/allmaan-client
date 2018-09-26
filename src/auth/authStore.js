import _ from 'lodash';
const authActionPrefix = "auth/";

const initialState = {
  admin: null
};

export const authActions = {
  LOG_IN: authActionPrefix + "LOG_IN",
  SET_ADMIN: authActionPrefix + "SET_ADMIN"
};

export const authActionCreators = {
  login: loginData => ({type: authActions.LOG_IN, loginData}),
  setAdmin: admin => ({type: authActions.SET_ADMIN, admin})
};

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case authActions.SET_ADMIN:
      return {
        ...state,
        admin: action.admin
      };
    default:
      return state;
  }
};