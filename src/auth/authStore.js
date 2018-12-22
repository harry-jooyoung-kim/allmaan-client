import _ from 'lodash';
const authActionPrefix = "auth/";

const initialState = {
  admin: {}
};

export const authActions = {
  LOG_IN: authActionPrefix + "LOG_IN",
  SET_ADMIN: authActionPrefix + "SET_ADMIN",
  UPDATE_ADMIN: authActionPrefix + "UPDATE_ADMIN"
};

export const authActionCreators = {
  login: loginData => ({type: authActions.LOG_IN, loginData}),
  setAdmin: admin => ({type: authActions.SET_ADMIN, admin}),
  updateAdmin: params => ({type: authActions.UPDATE_ADMIN, params})
};

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case authActions.SET_ADMIN:
      return {
        ...state,
        admin: action.admin
      };
    case authActions.UPDATE_ADMIN:
      return {
        ...state,
        admin: {
          ...(state.admin || {}),
          ...action.params
        }
      };
    default:
      return state;
  }
};