import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import './Main.scss';
import AddScheduleModal from '../../schedule/components/AddScheduleModal';
import ManageScheduleModal from '../../schedule/components/ManageScheduleModal';
import firebase from 'firebase';
import {firebaseInit} from "../../firebase";

const MODAL_MAX_WIDTH = 400;
const MODAL_MAX_HEIGHT = 200;

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1 ;

class Main extends React.PureComponent {
  state = {
    year,
    month,
    modalParams: {
      show: false,
      position: {},
      type: null,
      date: null,
      targetSchedule: null
    },
    schedules: []
  };

  async componentDidMount() {
    const snapshot = await firebase.firestore().collection('schedule').where('startTime', '>=', new Date(year, month - 1, 0)).get();

    const schedules = _.map(snapshot.docs, doc => ({
      id: doc.id,
      ...doc.data()
    }));
    this.setState({
      schedules
    });
    this._registerListener(year, month);
  }

  _listener = null;
  _registerListener = (year, month) => {
    if(this._listener) this._listener();

    this._listener = firebase.firestore().collection('schedule').where('startTime', '>=', new Date(year, month - 1, 0))
      .onSnapshot(snapshot => {
        const schedules = _.map(snapshot.docs, doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.setState({
          schedules
        });
      })
  };

  _modalContainerElement = null;
  _showModal = (clientX, clientY, params) => {
    const {offsetWidth, offsetHeight} = document.body;

    const position = {};
    if(offsetWidth - clientX < MODAL_MAX_WIDTH) position.right = offsetWidth - clientX + 3;
    else position.left = clientX + 3;

    if(offsetHeight - clientY < MODAL_MAX_HEIGHT) position.bottom = offsetHeight - clientY - 3;
    else position.top = clientY + 3;

    this.setState({
      modalParams: {
        ...this.state.modalParams,
        show: true,
        position,
        ...params
      }
    });

    setTimeout(() => {
      this._modalContainerElement.classList.add('show');
    }, 100);
  };

  _hideModal = () => {
    this._modalContainerElement.classList.remove('hide');
    this.setState({
      modalParams: {
        ...this.state.modalParams,
        show: false
      }
    });
  };

  _addSchedule = (e, date) => {
    const {year, month, day} = date;
    const {clientX, clientY} = e;
    this._showModal(clientX, clientY, {
      date: new Date(year, month - 1, day),
      type: 'addSchedule'
    });
  };

  _editSchedule = (e, schedule) => {
    const {clientX, clientY} = e;
    this._showModal(clientX, clientY, {
      targetSchedule: schedule,
      type: 'manageSchedule'
    })
  };

  render() {
    const {year, month, modalParams, schedules} = this.state;
    const firstDayOfMonth = (new Date(year, month - 1, 1)).getDay();
    const daysOfMonth = (new Date(year, month, 0)).getDate();

    const total = firstDayOfMonth + daysOfMonth ;

    let row ;
    if (total > 28) row = 5 ;
    else row = 4 ;

    const filteredSchedules = _.filter(schedules, s => s.startTime.toDate().getFullYear() === year
    && s.startTime.toDate().getMonth() + 1 === month);

    return <div className="main">
      <div className={"calendar"}>
        <div className={"calendar-header"}>
          <div className="year-item">
            {year}
          </div>
          <div className="month-item">
            <button className="btn-clear icon ion-arrow-left-b" onClick={e => {
              const targetMonth = month === 1 ? 12 : month - 1;
              const targetYear = month === 1 ? year - 1 : year;
              this.setState({
                month: targetMonth,
                year: targetYear
              });
              this._registerListener(targetYear, targetMonth);
            }}/>
            {month}
            <button className="btn-clear icon ion-arrow-right-b" onClick={e => {
              const targetMonth = month === 12 ? 1 : month + 1;
              const targetYear = month === 12 ? year + 1 : year;
              this.setState({
                month: targetMonth,
                year: targetYear
              });
              this._registerListener(targetYear, targetMonth);
            }}/>
          </div>
        </div>
        <div className={"calendar-body"}>
            {
              _.map(_.range(row), (r, i) => {
                return <div className={"calendar-row"} key = {i}>
                          {
                            _.map(_.range(7), (d, i) => {
                              const day = 7*r + d - firstDayOfMonth + 1 ;
                              return <div
                                className={"calendar-day"}
                                key={i}
                                onClick={e => this._addSchedule(e, {year, month, day})}>
                                <p className="date">{day > 0 && day <= daysOfMonth ? day : ''}</p>
                                <div className="schedule-list">
                                  {
                                    _(filteredSchedules)
                                      .filter(schedule => schedule.startTime.toDate().getDate() === day)
                                      .orderBy([s => s.startTime.toDate()], ['asc'])
                                      .map(s => {
                                        const date = s.startTime.toDate();
                                        const hours = date.getHours();
                                        const minutes = date.getMinutes();
                                        return <div key={s.id} className="schedule-item btn-hover" onClick={e => {
                                          e.stopPropagation();
                                          this._editSchedule(e, s);
                                        }}>
                                          <p className="time">{`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`}</p>
                                          <p className="title">{s.title}</p>
                                        </div>
                                      })
                                      .value()
                                  }
                                </div>
                              </div>
                            })
                          }
                  </div>
                })
            }
        </div>
      </div>
      {modalParams.show && <div className="modal-backdrop" onClick={this._hideModal}>
        <div className="modal-backdrop-wrapper">
          <div className="modal-container"
               ref={ele => {
                 this._modalContainerElement = ele;
                 console.log('res call', this._modalContainerElement);
               }}
               onClick={e => e.stopPropagation()}
               style={{
            position: 'absolute',
            ...modalParams.position
          }}>
            {
              modalParams.type === 'addSchedule' ? <AddScheduleModal
                  date={modalParams.date}
                  hide={this._hideModal}
                /> : <ManageScheduleModal targetSchedule={modalParams.targetSchedule} hide={this._hideModal}/>
            }
          </div>
        </div>
      </div>}
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.admin.user
  }
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main)

