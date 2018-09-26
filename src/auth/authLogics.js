import {createLogic} from 'redux-logic';
import {push} from 'react-router-redux';
import {batchActions} from 'redux-batched-actions';
import {authActions, authActionCreators} from './authStore';

const loginLogic = createLogic({
  type: authActions.LOG_IN,
  process: async ({getState, action, http}, dispatch, done) => {

    try {
      await http.post("/login", action.loginData);
      alert("로그인이 완료");

      dispatch(push('/main'))
    } catch(e) {
      alert("ㄴㄴ");
    }
    done();
  }
});

export default [
  loginLogic
]
