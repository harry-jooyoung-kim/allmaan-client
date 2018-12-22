import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import _ from 'lodash';
import firebase from 'firebase';

import './Join.scss';
import {userActionCreators} from "../../user/userStore";
class Join extends React.PureComponent{
    state = {
        email: '',
        name: '',
        password: ''
    };

    _join = async params => {
        const {email, password, name} = params;
        const {push} = this.props;
        try {
          const res = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
          const {user} = res;
          await user.updateProfile({
              displayName: name
          });
          push('/login');
        } catch(err) {
          const {message} = err;
          alert(message);
        }
    };

    render() {
        return <div className="join">
            <div className="join-container">
                <form>
                    <input className="input-container" placeholder="Email" onChange={e => {
                      let textVal = e.target.value;
                      this.setState({email: textVal});
                    }
                    }/>
                    <input className="input-container" placeholder="Name" onChange={e => {
                      let textVal = e.target.value;
                      this.setState({name: textVal});
                    }
                    }/>
                    <input type="password" className="input-container" placeholder="Password" onChange={e => {
                      let textVal = e.target.value;
                      this.setState({password: textVal});
                    }
                    }/>
                    <button type="submit" className="btn-clear btn-join" onClick={e => {
                        e.preventDefault();
                        this._join({
                            name: this.state.name,
                            email: this.state.email,
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
})(Join)
