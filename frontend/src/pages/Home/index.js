import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EventListContainer from '../../components/EventListContainer/EventListContainer';
import EventFilter from '../../components/EventFilter';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Parallax, Background } from 'react-parallax';

import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DefaultLayout from '../../layouts/Default';
import EventCreatorOpenerButton from '../../components/EventCreatorOpenerButton';

import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

import schoolingEventActions from '../../actions/schoolingEventActions';

const styles = theme => ({
  listHeaderContainer: {
    padding: `${theme.spacing.unit}px 0`,
    paddingBottom: theme.spacing.unit / 2
  },
  sortBy: {},
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  eventFilterContainer: {
    position: 'absolute'
  },
  paralax: {
    position: 'relative',
    height: 320,
    display: 'flex',
    justifyContent: 'center',

    '& .react-parallax-bgimage': {
      filter: 'blur(3px) grayscale(50%)'
    }
  }
});

class HomePage extends React.Component {
  state = {
    sortBy: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, getFeaturedSchoolingEventsRequest } = this.props;

    console.log(this.props);

    return (
      <DefaultLayout
        aboveContent={
          <Parallax
            className={classes.paralax}
            bgImage="https://www.mch-group.com/-/media/mch-group/Images/Content/News/Blog/2017/2017-04/Marco-Balich-Rio-Olympic-Ceremony-1200.jpg"
            bgImageAlt="the dog"
          >
            <EventFilter className={classes.eventFilterContainer} />
          </Parallax>
        }
      >
        <Grid container>
          <EventCreatorOpenerButton mode="add" />

          <div
            onClick={() => {
              getFeaturedSchoolingEventsRequest();
            }}
          >
            Click me!
          </div>

          <Grid
            container
            wrap="nowrap"
            justify="space-between"
            className={classes.listHeaderContainer}
          >
            <Grid item container justify="flex-end" direction="column">
              <Typography variant="headline">23 Results Found</Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sortByInput">Sort by</InputLabel>
                <Select
                  value={this.state.sortBy}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'sortBy',
                    id: 'sortByInput'
                  }}
                >
                  <MenuItem value="">
                    <em>Nothing</em>
                  </MenuItem>
                  <MenuItem value={10}>Ticket price Ascending</MenuItem>
                  <MenuItem value={20}>Ticket price Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <EventListContainer />
        </Grid>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getFeaturedSchoolingEventsRequest: () => {
    dispatch(
      schoolingEventActions.getFeaturedSchoolingEventsRequest.start({
        page: 0,
        pageSize: 10
      })
    );
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
