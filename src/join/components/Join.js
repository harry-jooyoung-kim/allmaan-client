import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import './Join.scss';
class Login extends React.PureComponent{
    render() {
        return <div className="join">
            <div className="join-container">
                <input className="input-container" placeholder="First Name"/>
                <input className="input-container" placeholder="Last Name"/>
                <input className="input-container" placeholder="Nickname (ID)"/>
                <input type="password" className="input-container" placeholder="Password"/>
                <button className="btn-clear btn-join" onClick={e => this.props.push('/login')}>
                    Join in
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
