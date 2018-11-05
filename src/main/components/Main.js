import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import './Main.scss';

class Main extends React.PureComponent {

  render() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 ;
    const firstDayOfMonth = (new Date(year, month - 1, 1)).getDay();
    const daysOfMonth = (new Date(year, month, 0)).getDate();

    const total = firstDayOfMonth + daysOfMonth ;

    let row ;
    if (total > 28) row = 5 ;
    else row = 4 ;

    return <div className="main">
      <div className={"calendar"}>
        <div className={"calendar-header"}>
            {year} {month}
        </div>
        <div className={"calendar-body"}>
            {
              _.map(_.range(row), (r, i) => {
                return <div className={"calendar-row"} key = {i}>
                          {
                            _.map(_.range(7), (d, i) => {
                              const day = 7*r + d - firstDayOfMonth + 1 ;
                              return <div className={"calendar-day"}>
                                          {
                                           day > 0 && day <= daysOfMonth ? day : ''
                                          }
                              </div>
                            })
                          }
                  </div>
                })
            }
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main)

