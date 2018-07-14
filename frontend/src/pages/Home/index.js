import React from 'react';
import Header from '../../components/Header/Header';
import EventListContainer from '../../components/EventListContainer/EventListContainer';

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
        <Header />

        <div className="container">
          <p>HOME Component</p>

          <EventListContainer />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
