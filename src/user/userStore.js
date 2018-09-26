import _ from 'lodash';
const userActionPrefix = "user/";

export const userActions = {
  JOIN: userActionPrefix + "JOIN",
  SET_USERS: userActionPrefix + "SET_USERS"
};

export const userActionCreators = {
  join: userData => ({type: userActions.JOIN, userData}),
  setUsers: users => ({type: userActions.SET_USERS, users})
};

const initialState = {
  users: {}
};

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case userActions.SET_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          ..._.keyBy(action.users, 'id')
        }
      };
  default:
      return state;
  }
};