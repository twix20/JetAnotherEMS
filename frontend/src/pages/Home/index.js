import React from 'react';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <div className="container page">
          <div className="row">
            <Button variant="contained" color="primary">
              Welcome EMS
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
