import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  dots: {
    overflowX: 'auto'
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

    return (
      <Grid
        rest
        container
        className={classes.dots}
        index={activeStep}
        wrap="nowrap"
      >
        {[...new Array(steps)].map((_, step) => {
          const isActive = step === activeStep;
          const dotColor = isActive ? 'secondary' : 'textSecondary';
          // eslint-disable-next-line react/no-array-index-key

          return (
            <Grid
              item
              key={step}
              onClick={() => onDotClick(step)}
              className={classes.button}
            >
              <Typography variant="display3" color={dotColor}>
                <b>13</b>
              </Typography>
              <Typography variant="caption" className={classes.day}>
                Friday
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

Dots.defaultProps = {
  onDotClick: step => true
};

export default withStyles(styles)(Dots);
