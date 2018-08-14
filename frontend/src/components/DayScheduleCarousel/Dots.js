import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  dots: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dot: {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: theme.spacing.unit,
    height: theme.spacing.unit,
    margin: '0 2px'
  },
  dotActive: {
    backgroundColor: theme.palette.primary.main
  },
  progress: {
    width: '50%'
  }
});

function Dots(props) {
  const { classes, activeStep, steps, onDotClick } = props;

  return (
    <div className={classes.dots}>
      {[...new Array(steps)].map((_, step) => {
        const dotClassName = classNames(classes.dot, {
          [classes.dotActive]: step === activeStep
        });
        // eslint-disable-next-line react/no-array-index-key
        return (
          <div
            key={step}
            className={dotClassName}
            onClick={() => onDotClick(step)}
          />
        );
      })}
    </div>
  );
}

Dots.defaultProps = {
  onDotClick: step => true
};

export default withStyles(styles)(Dots);
