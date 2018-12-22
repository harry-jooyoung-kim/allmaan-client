import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import _ from 'lodash';

import './Login.scss';
import logo from '../../image/logo.png';
import {authActionCreators} from "../../auth/authStore";
import firebase from 'firebase';

class Login extends React.PureComponent{
  state = {
    email: '',
    password: ''
  };

  _login = async params => {
    const {email, password} = params;
    const {push} = this.props;
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(email, password);
      push('/main');
    } catch(err) {
      console.log(err);
    }
  };

  render() {
   return <div className="log-in">
   <div className="log-in-container">
       <form>
       <img className="logo" src={logo}/>
       <input className="input-container" placeholder="Email (ID)" onChange={e => {
         let textVal = e.target.value;
         this.setState({email: textVal});
       }
       }/>
           <input type="password" className="input-container" placeholder="Password" onChange={e => {
             let textVal = e.target.value;
             this.setState({password: textVal});
           }
           }/>
       <button type="submit" className="btn-clear btn-login" onClick={e => {
         {/*this.props.push('/main')*/}
         e.preventDefault();
         this._login({
           email: this.state.email,
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
  push
})(Login)
