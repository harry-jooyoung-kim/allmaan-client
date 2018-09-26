import {createLogic} from 'redux-logic';
import {push} from 'react-router-redux';
import {batchActions} from 'redux-batched-actions';
import {userActions, userActionCreators} from './userStore'

const joinLogic = createLogic({
  type: userActions.JOIN,
  process: async ({getState, action, http}, dispatch, done) => {
    try {
      await http.post('/users', action.userData);
      alert('회원가입이 완료됐습니다');
      dispatch(push('/login'))
    } catch(e) {

    }
    done();
  }
});

export default [
  joinLogic
]
