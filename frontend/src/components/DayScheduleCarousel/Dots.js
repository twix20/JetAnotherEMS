import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = theme => ({
  dots: {
    overflowX: 'auto'
  },
  button: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px`,
    textAlign: 'center',
    display: 'inline-block'
  },
  day: {
    textTransform: 'uppercase'
  }
});

class Dots extends React.Component {
  constructor(props) {
    super(props);
    // Declare and initialize the ref in the constructor
    this.activeDotRef = React.createRef();
  }

  componentDidUpdate() {
    const id = this.activeDotRef.props.id;
    const el = document.getElementById(id);
    const parent = el.parentNode;
    const offset = el.offsetLeft - parent.offsetLeft - parent.offsetWidth / 2;

    parent.scroll({ left: offset, behavior: 'smooth' });

    console.log(this.activeDotRef);
  }

  render() {
    const { classes, activeStep, steps, onDotClick } = this.props;

    const self = this;

    return (
      <Grid
        item
        container
        wrap="nowrap"
        className={classes.dots}
        index={activeStep}
        justify={steps > 6 ? '' : 'center'}
      >
        {[...new Array(steps)].map((_, step) => {
          const isActive = step === activeStep;
          const dotColor = isActive ? 'secondary' : 'textSecondary';
          // eslint-disable-next-line react/no-array-index-key

          const day = moment().add(step, 'days');
          return (
            <Grid
              ref={node => {
                if (isActive) {
                  self.activeDotRef = node;
                }
              }}
              item
              id={`element_${step}`}
              key={step}
              onClick={() => onDotClick(step)}
              className={classes.button}
            >
              {/* <Typography variant="caption" color={dotColor}>
                <b>{day.format("MMMM")}</b>
              </Typography> */}
              <Typography variant="display3" color={dotColor}>
                <b>{day.format('DD')}</b>
              </Typography>
              <Typography variant="caption" className={classes.day}>
                {day.format('dddd')}
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
