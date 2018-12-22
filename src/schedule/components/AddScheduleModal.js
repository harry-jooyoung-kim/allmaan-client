import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';

import './AddScheduleModal.scss';

class AddScheduleModal extends React.PureComponent {

  render() {
    const {currentUser, date, hide} = this.props;
    return <div className="add-schedule-modal">
      <div className="section-header">
        Manage schedule
      </div>
      <div className="section-title">
        <input placeholder="Enter the title" ref={ele => this._titleInputElement = ele}/>
      </div>
      <div className="section-date">
        <p className="date">{date.toDateString()}</p>
        <input type="time" ref={ele => this._timeInputElement = ele}/>
      </div>
      <div className="section-buttons">
        <button className="btn-clear btn-cancel" onClick={hide}>Cancel</button>
        <button className="btn-clear btn-submit" onClick={e => {
          const targetDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${this._timeInputElement.value}`);
          const schedule = {
            title: this._titleInputElement.value,
            startTime: targetDate,
            userId: currentUser.uid
          };
          console.log('schedule', schedule);
          firebase.firestore().collection('schedule').add(schedule);
          hide();
        }}>Submit</button>
      </div>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.admin.user
  }
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddScheduleModal)

