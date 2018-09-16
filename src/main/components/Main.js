import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import './Main.scss';

class Main extends React.PureComponent {

  render() {
    return <div className="main">
      Main
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main)

