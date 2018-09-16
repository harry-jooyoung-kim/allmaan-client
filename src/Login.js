import React from 'react';
import './Login.scss';
import logo from './Image/logo.png';
class Login extends React.PureComponent{
    render() {
     return <div className="log-in">
     <div className="log-in-container">
         <img className="logo" src={logo}/>
         <input className="input-container" placeholder="이메일"/>
             <input className="input-container" placeholder="비밀번호"/>
         <button className="btn-clear btn-login">
             로그인
         </button>
     </div>
     </div>
    }
}

export default Login