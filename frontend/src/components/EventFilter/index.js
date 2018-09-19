import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import { DatePicker } from 'material-ui-pickers';

import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import HeartCheckobx from '../common/HeartCheckbox';

const styles = theme => ({
  section: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px `,
    width: '300px',

    '&:not(:first-child)': {
      borderLeft: `2px solid ${theme.palette.divider}`
    }
  },
  sectionTitle: {
    textTransform: 'uppercase'
  },
  slider: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  datePicker: {
    width: '45%',
    '&:not(:first-child)': {
      marginBottom: theme.spacing.unit,
      marginLeft: '5%'
    }
  }
});

class EventFilter extends React.Component {
  state = {
    amount: [0, 100],
    date: {
      from: null,
      to: null
    }
  };

  handlePriceChange = range => {
    this.setState({ amount: range });
  };

  handleDateChange = (newDate, name) => {
    this.setState({
      date: {
        ...this.state.date,
        [name]: newDate
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Grid container>
          <Grid item className={classes.section}>
            <Typography
              variant="caption"
              gutterBottom
              className={classes.sectionTitle}
            >
              Location
            </Typography>
          </Grid>
          <Grid item className={classes.section}>
            <Typography
              variant="caption"
              gutterBottom
              className={classes.sectionTitle}
            >
              Date range
            </Typography>

            <DatePicker
              className={classes.datePicker}
              autoOk
              label="From"
              clearable
              value={this.state.date.from}
              onChange={date => this.handleDateChange(date, 'from')}
              animateYearScrolling={false}
            />

            <DatePicker
              className={classes.datePicker}
              autoOk
              label="To"
              clearable
              value={this.state.date.to}
              onChange={date => this.handleDateChange(date, 'to')}
              animateYearScrolling={false}
            />
          </Grid>
          <Grid item container className={classes.section}>
            <Typography
              variant="caption"
              gutterBottom
              className={classes.sectionTitle}
            >
              Price range
            </Typography>

            <Grid container direction="column" justify="center">
              <Grid item>
                <Typography variant="headline" align="center">
                  ${this.state.amount[0]} - ${this.state.amount[1]}
                </Typography>
              </Grid>

              <Grid item className={classes.slider}>
                <Range
                  allowCross={false}
                  min={0}
                  max={100}
                  defaultValue={[0, 100]}
                  onChange={this.handlePriceChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.section}>
            <Typography
              variant="caption"
              className={classes.sectionTitle}
              gutterBottom
            >
              Filters
            </Typography>

            <HeartCheckobx id="filterFavorite" labelText="Favorites" />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EventFilter);
