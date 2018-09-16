import React from 'react';
import './LogIn.scss';
import logo from './img/logo.png';

class LogIn extends React.PureComponent {
  render() {
    return <div className="log-in">
      <div className="log-in-container">
        <img className="logo" src={logo}/>
        <input className="input-container" placeholder="id"/>
        <input className="input-container" placeholder="password"/>
        <button className="btn-clear btn-login">
          Log In
        </button>
      </div>
    </div>
  }
}

export default LogIn
// import React from 'react';
// import {connect} from 'react-redux';
// import _ from 'lodash';
//
// import './.scss';
//
// class  extends React.PureComponent {
//
//   render() {
//   }
// }
//
// const mapStateToProps = (state, ownProps) => {
//   return {}
// };
//
// const mapDispatchToProps = dispatch => ({});
//
// export default connect(mapStateToProps, mapDispatchToProps)()
//
