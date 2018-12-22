import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';
import './ManageScheduleModal.scss';

class ManageScheduleModal extends React.PureComponent {
  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const {targetSchedule, hide} = this.props;
    return <div className="manage-schedule-modal">
      <div className="section-header">
        Manage schedule
      </div>
      <div className="section-title">
        <input defaultValue={targetSchedule && targetSchedule.title} ref={ele => this._titleInputElement = ele}/>
      </div>
      <div className="section-date">
        <input
          defaultValue={targetSchedule && targetSchedule.startTime.toDate().toDatetimeLocal()}
          ref={ele => this._datetimeInputElement = ele}
          type="datetime-local"/>
      </div>
      <div className="section-buttons">
        <button className="btn-clear" onClick={e => {
          firebase.firestore().collection('schedule').doc(targetSchedule.id).delete();
          hide();
        }}>Delete</button>
        <button className="btn-clear" onClick={hide}>Cancel</button>
        <button className="btn-clear" onClick={e => {
          firebase.firestore().collection('schedule').doc(targetSchedule.id).update({
            title: this._titleInputElement.value,
            startTime: new Date(this._datetimeInputElement.value)
          });
          hide();
        }}>Submit</button>
      </div>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ManageScheduleModal)

