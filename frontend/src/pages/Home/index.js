import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EventListContainer from '../../components/EventListContainer/EventListContainer';
import EventFilter from '../../components/EventFilter';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Parallax } from 'react-parallax';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DefaultLayout from '../../layouts/Default';
import EventCreatorOpenerButton from '../../components/EventCreatorOpenerButton';

import { connect } from 'react-redux';

import schoolingEventFilterActions from '../../actions/schoolingEventFilterActions';
import {
  schoolingEventSelectors,
  schoolingEventFilterSelectors
} from '../../reducers/selectors';
import { SchoolingEventSortType } from './../../constants/enums';
import Can from './../../components/Can';

const styles = theme => ({
  listHeaderContainer: {
    padding: `${theme.spacing.unit}px 0`,
    paddingBottom: theme.spacing.unit / 2
  },
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
  handleFilterChange = event => {
    this.props.updateFilter(event.target.name, event.target.value);
  };

  render() {
    const { classes, featuredEvents, sort } = this.props;

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
          <Can I="create" a="SchoolingEvent">
            <EventCreatorOpenerButton mode="add" />
          </Can>

          <Grid
            container
            wrap="nowrap"
            justify="space-between"
            className={classes.listHeaderContainer}
          >
            <Grid item container justify="flex-end" direction="column">
              <Typography variant="headline">
                {featuredEvents.length} Results Found
              </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="sortByInput">Sort by</InputLabel>
                <Select
                  value={sort}
                  onChange={this.handleFilterChange}
                  inputProps={{
                    name: 'sort',
                    id: 'sortByInput'
                  }}
                >
                  <MenuItem value={SchoolingEventSortType.None}>
                    <em>Nothing</em>
                  </MenuItem>
                  <MenuItem value={SchoolingEventSortType.TicketPriceAscending}>
                    Ticket price Ascending
                  </MenuItem>
                  <MenuItem
                    value={SchoolingEventSortType.TicketPriceDescending}
                  >
                    Ticket price Descending
                  </MenuItem>
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

const mapStateToProps = state => ({
  featuredEvents: schoolingEventSelectors.featured(state),
  sort: schoolingEventFilterSelectors.filter(state).sort
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (name, data) =>
    dispatch(schoolingEventFilterActions.updateFilter(name, data))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
