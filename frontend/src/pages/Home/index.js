import React from 'react';
import Header from '../../components/Header/Header';
import EventListContainer from '../../components/EventListContainer/EventListContainer';
import EventFilter from '../../components/EventFilter/EventFilter';
import Grid from '@material-ui/core/Grid';
import { Parallax, Background } from 'react-parallax';

import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

import './Home.scss';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <Header />

        <Parallax
          className="home__paralax"
          blur={3}
          bgImage="https://www.mch-group.com/-/media/mch-group/Images/Content/News/Blog/2017/2017-04/Marco-Balich-Rio-Olympic-Ceremony-1200.jpg"
          bgImageAlt="the dog"
          strength={200}
        >
          <EventFilter className="home__eventFilterContainer" />
        </Parallax>

        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8}>
            <p>HOME Component</p>

            <EventListContainer />
          </Grid>
          <Grid item lg={2}>
            Stopka? Reklama?
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
