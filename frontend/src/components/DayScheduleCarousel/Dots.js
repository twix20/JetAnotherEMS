import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = theme => ({
  dots: {
    height: '100px'
  },
  button: {
    margin: theme.spacing.unit,
    textAlign: 'center',
    display: 'inline-block'
  },
  day: {
    textTransform: 'uppercase'
  }
});

class Dots extends React.Component {
  render() {
    const {
      classes,
      activeStep,
      steps,
      onDotClick,

      ...rest
    } = this.props;

    const maxStepsToShow = 5;

    return (
      <div rest className={classes.dots} index={activeStep}>
        {[...new Array(maxStepsToShow)].map((_, i) => {
          let offset = steps - (steps - activeStep);
          offset = offset - 2 > 0 ? offset - 2 : 0;
          const step = offset + i;

          console.log(step);

          const isActive = step === activeStep;
          const dotColor = isActive ? 'secondary' : 'textSecondary';
          // eslint-disable-next-line react/no-array-index-key

          const day = moment().add(step, 'days');

          return (
            <div
              id={`element_${step}`}
              key={step}
              onClick={() => onDotClick(step)}
              className={classes.button}
            >
              <Typography variant="display3" color={dotColor}>
                <b>{day.format('DD')}</b>
              </Typography>
              <Typography variant="caption" className={classes.day}>
                {day.format('dddd')}
              </Typography>
            </div>
          );
        })}
      </div>
    );
  }
}

Dots.defaultProps = {
  onDotClick: step => true
};

export default withStyles(styles)(Dots);
