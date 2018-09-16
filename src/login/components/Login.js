import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import './Login.scss';
import logo from '../../image/logo.png';
class Login extends React.PureComponent{
    render() {
     return <div className="log-in">
     <div className="log-in-container">
         <img className="logo" src={logo}/>
         <input className="input-container" placeholder="이메일"/>
             <input className="input-container" placeholder="비밀번호"/>
         <button className="btn-clear btn-login" onClick={e => this.props.push('/main')}>
             로그인
         </button>
     </div>
     </div>
    }
}

const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps, {
  push
})(Login)