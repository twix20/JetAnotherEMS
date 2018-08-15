import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EventListContainer from '../../components/EventListContainer/EventListContainer';
import EventFilter from '../../components/EventFilter';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Parallax, Background } from 'react-parallax';

import DefaultLayout from '../../layouts/Default';

import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

import './Home.scss';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const styles = theme => ({
  listHeaderContainer: {
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit / 2
  }
});

class HomePage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <DefaultLayout>
        <Parallax
          className="home__paralax"
          bgImage="https://www.mch-group.com/-/media/mch-group/Images/Content/News/Blog/2017/2017-04/Marco-Balich-Rio-Olympic-Ceremony-1200.jpg"
          bgImageAlt="the dog"
        >
          <EventFilter className="home__eventFilterContainer" />
        </Parallax>

        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8}>
            <Grid
              container
              justify="space-between"
              className={classes.listHeaderContainer}
            >
              <Grid item>
                <Typography variant="headline">23 Results Found</Typography>
              </Grid>
              <Grid item>Sort by</Grid>
            </Grid>

            <EventListContainer />
          </Grid>
        </Grid>
      </DefaultLayout>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
