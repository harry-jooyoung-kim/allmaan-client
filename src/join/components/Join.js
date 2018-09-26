import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import './Join.scss';
class Login extends React.PureComponent{
    state = {
        Nickname: ''
    };
    render() {
        return <div className="join">
            <div className="join-container">
                <form>
                <input className="input-container" placeholder="First Name"/>
                <input className="input-container" placeholder="Last Name"/>
                <input className="input-container" placeholder="Nickname (ID)" onChange={e => {
                    let textVal = e.target.value;
                    this.setState({Nickname: textVal});
                }
                }/>
                <input type="password" className="input-container" placeholder="Password"/>
                <button type="submit" className="btn-clear btn-join" onClick={
                    e => {{alert("Welcome, "+this.state.Nickname+" !")}
                    this.props.push('/login')}}> Join in
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
