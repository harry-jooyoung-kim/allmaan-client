import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import _ from 'lodash';

import './Join.scss';
import {userActionCreators} from "../../user/userStore";
class Login extends React.PureComponent{
    state = {
        nickName: '',
        name: '',
        lastName: '',
        password: ''
    };

    render() {
        return <div className="join">
            <div className="join-container">
                <form>
                <input className="input-container" placeholder="First Name" onChange={e => {
                  let textVal = e.target.value;
                  this.setState({name: textVal});
                }
                }/>
                <input className="input-container" placeholder="Last Name" onChange={e => {
                  let textVal = e.target.value;
                  this.setState({lastName: textVal});
                }
                }/>
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
                <button type="submit" className="btn-clear btn-join" onClick={e => {
                    e.preventDefault();
                    this.props.join({
                        name: this.state.name,
                        lastName: this.state.lastName,
                        nickName: this.state.nickName,
                        password: this.state.password
                    })
                }}> Join in
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
  ..._.pick(userActionCreators, ['join'])
})(Login)
