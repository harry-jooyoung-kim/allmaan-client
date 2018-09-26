import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import './Login.scss';
import logo from '../../image/logo.png';
class Login extends React.PureComponent{
    render() {
     return <div className="log-in">
     <div className="log-in-container">
         <form>
         <img className="logo" src={logo}/>
         <input className="input-container" placeholder="Nickname (ID)"/>
             <input type="password" className="input-container" placeholder="Password"/>
         <button type="submit" className="btn-clear btn-login" onClick={e => this.props.push('/main')}>
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
