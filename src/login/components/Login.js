import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import _ from 'lodash';

import './Login.scss';
import logo from '../../image/logo.png';
import {authActionCreators} from "../../auth/authStore";

class Login extends React.PureComponent{
  state = {
    nickName: '',
    password: ''
  };

    render() {
     return <div className="log-in">
     <div className="log-in-container">
         <form>
         <img className="logo" src={logo}/>
         <input className="input-container" placeholder="Nickname (ID)" onChange={e => {
           let textVal = e.target.value;
           this.setState({nickName: textVal});
         }
         }/>
             <input type="password" className="input-container" placeholder="Password" onChange={e => {
               let textVal = e.target.value;
               this.setState({password: textVal});
             }
             }/>
         <button type="submit" className="btn-clear btn-login" onClick={e => {
           {/*this.props.push('/main')*/}
           console.log('onclick call');
           e.preventDefault();
           this.props.login({
             nickName: this.state.nickName,
             password: this.state.password
           });
         }}>
             Login
         </button>
         <button className="btn-clear btn-join" onClick={e => this.props.push('/join')}>
             Join us
         </button>
         </form>
     </div>
     </div>
    }
}

const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps, {
  push,
  ..._.pick(authActionCreators, ['login'])
})(Login)
