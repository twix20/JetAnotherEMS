import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Hidden from '@material-ui/core/Hidden';
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment';
import times from 'lodash/times';

import DaySchedule from '../DaySchedule';
import Dots from './Dots';

import { connect } from 'react-redux';
import schoolingEventActions from '../../actions/schoolingEventActions';
import {
  scheduleSelectors,
  createLoadingSelector
} from '../../reducers/selectors';
import groupBy from 'lodash/groupBy';

const styles = theme => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%'
  },
  dotsContainer: {},
  dotsPaginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scheduleContainer: {
    padding: theme.spacing.unit * 4
  },
  hidden: {
    display: 'none'
  }
});

class DayScheduleCarousel extends React.Component {
  state = {
    activeStep: 0
  };

  componentDidMount() {
    const { eventId, fetchSchedule } = this.props;

    fetchSchedule(eventId);
  }

  handleDotClick = step => {
    this.setState({
      activeStep: step
    });
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const {
      classes,
      theme,
      eventId,
      scheduleForEvent,
      loadingSchedule
    } = this.props;
    const { activeStep } = this.state;

    if (loadingSchedule) return <div>Loading</div>;

    const schedule = scheduleForEvent(eventId);

    if (!schedule) return <div>Loading............</div>;

    const scheduleDays = groupBy(schedule, d =>
      moment(d.from)
        .startOf('day')
        .format()
    );

    const maxSteps = Object.keys(scheduleDays).length;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Hidden mdDown>
            <Grid item className={classes.dotsPaginationContainer} lg={1}>
              <Button
                size="small"
                onClick={this.handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
              </Button>
            </Grid>
          </Hidden>

          <Grid
            item
            container
            className={classes.dotsContainer}
            lg={10}
            md={12}
          >
            <Dots
              item
              steps={scheduleDays}
              activeStep={activeStep}
              onDotClick={this.handleDotClick}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item className={classes.dotsPaginationContainer} lg={1}>
              <Button
                size="small"
                onClick={this.handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                <KeyboardArrowRight />
              </Button>
            </Grid>
          </Hidden>
        </Grid>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {Object.keys(scheduleDays).map((dayDate, i) => {
            const day = scheduleDays[dayDate];
            return (
              <div
                key={i}
                hidden={activeStep !== i}
                className={classnames(classes.scheduleContainer)}
              >
                {i === activeStep &&
                  day.map(dayActivity => (
                    <DaySchedule day={dayActivity} key={dayActivity.id} />
                  ))}
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
  }
}

DayScheduleCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scheduleForEvent: eventId =>
    scheduleSelectors.forSchoolingEvent(state, eventId),
  loadingSchedule: createLoadingSelector([
    schoolingEventActions.getScheduleRequst.type
  ])(state)
});

const mapDispatchToProps = dispatch => ({
  fetchSchedule: id =>
    dispatch(schoolingEventActions.getScheduleRequst.start({ id }))
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DayScheduleCarousel)
);
