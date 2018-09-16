import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import { Typography } from '@material-ui/core';
import classnames from 'classnames';

const styles = theme => ({
  digit: {
    display: 'inline-block',
    textAlign: 'center',
    zoom: 1,
    marginRight: '4px'
  },
  digitNumber: {
    fontSize: '25px',
    padding: '3px 15px',
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  digitLabel: {
    padding: '5px',
    fontSize: '12px',
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  seconds: {
    color: theme.palette.secondary.dark
  }
});

class CountdownTimer extends React.Component {
  state = {};

  componentDidMount() {
    this.tick();
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    const { startDate } = this.props;

    const now = moment();
    const then = moment(startDate);

    var ms = moment(then, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(now, 'DD/MM/YYYY HH:mm:ss')
    );

    var d = moment.duration(ms);

    this.setState({
      days: d.days(),
      hours: d.hours(),
      minutes: d.minutes(),
      seconds: d.seconds()
    });
  };

  render() {
    const { classes } = this.props;

    const digitElement = ({ key, number, label, isSeconds = false }) => (
      <div key={key} className={classes.digit}>
        <div
          className={classnames(classes.digitNumber, {
            [classes.seconds]: isSeconds
          })}
        >
          {(number + '').padStart(2, '0')}
        </div>
        <div className={classes.digitLabel}>{label}</div>
      </div>
    );

    const digitElements = Object.entries(this.state).map((e, i) =>
      digitElement({
        key: i,
        number: e[1],
        label: e[0],
        isSeconds: i === 3
      })
    );

    return (
      <div>
        <Typography variant="title">Starts in</Typography>

        {digitElements}
      </div>
    );
  }
}

export default withStyles(styles)(CountdownTimer);
