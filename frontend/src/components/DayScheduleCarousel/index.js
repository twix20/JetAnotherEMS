import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment';
import times from 'lodash/times';

import DaySchedule from '../DaySchedule';
import Dots from './Dots';

const tutorialSteps = [
  {
    label: 'How to be happy :)',
    imgPath: '/static/images/steppers/1-happy.jpg'
  },
  {
    label: '1. Work with something that you like, like…',
    imgPath: '/static/images/steppers/2-work.jpg'
  },
  ,
  {
    label: '1. Work with something that you like, like…',
    imgPath: '/static/images/steppers/2-work.jpg'
  },
  ,
  {
    label: '1. Work with something that you like, like…',
    imgPath: '/static/images/steppers/2-work.jpg'
  },
  ,
  {
    label: '1. Work with something that you like, like…',
    imgPath: '/static/images/steppers/2-work.jpg'
  },
  ,
  {
    label: '1. Work with something that you like, like…',
    imgPath: '/static/images/steppers/2-work.jpg'
  },
  ,
  {
    label: '1. Work with something that you like, like…',
    imgPath: '/static/images/steppers/2-work.jpg'
  }
];

const styles = theme => ({
  root: {
    // maxWidth: 400,
    // flexGrow: 1
  },
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
  dotsContainer: {
    // flexGrow: 1
  },
  dotsPaginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scheduleContainer: {
    padding: theme.spacing.unit * 4
  }
});

class DayScheduleCarousel extends React.Component {
  state = {
    activeStep: 0
  };

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
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item className={classes.dotsPaginationContainer}>
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          </Grid>

          <Grid item className={classes.dotsContainer}>
            <Dots
              item
              steps={maxSteps}
              activeStep={activeStep}
              onDotClick={this.handleDotClick}
            />
          </Grid>

          <Grid item className={classes.dotsPaginationContainer}>
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          </Grid>
        </Grid>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {times(maxSteps, () => {
            const c = times(5, () => <DaySchedule />);

            return <div className={classes.scheduleContainer}>{c}</div>;
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

export default withStyles(styles, { withTheme: true })(DayScheduleCarousel);
