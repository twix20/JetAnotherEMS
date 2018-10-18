import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import { DatePicker } from 'material-ui-pickers';

import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import HeartCheckobx from '../common/HeartCheckbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import schoolingEventFilterActions from '../../actions/schoolingEventFilterActions';
import { connect } from 'react-redux';
import { schoolingEventFilterSelectors } from '../../reducers/selectors';

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
    date: {
      from: null,
      to: null
    }
  };

  handlePriceChange = range => {
    this.props.updateFilter('price', { from: range[0], to: range[1] });
  };

  handleDateChange = (newDate, name) => {
    let currentDate = this.props.filter.date;
    currentDate[name] = newDate;

    this.props.updateFilter('date', currentDate);
  };

  render() {
    const { classes, filter } = this.props;

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
              value={filter.date.from}
              onChange={date => this.handleDateChange(date, 'from')}
              animateYearScrolling={false}
            />

            <DatePicker
              className={classes.datePicker}
              autoOk
              label="To"
              clearable
              value={filter.date.to}
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
                  ${filter.price.from} - ${filter.price.to}
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

            <Grid item>
              <FormControlLabel
                control={<HeartCheckobx id="filterFavorite" />}
                label="Favorites"
                onChange={(event, checked) =>
                  this.props.updateFilter('toggleable', {
                    toggleableName: 'onlyFavorites',
                    value: checked
                  })
                }
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event, checked) =>
                      this.props.updateFilter('toggleable', {
                        toggleableName: 'onlyOngoing',
                        value: checked
                      })
                    }
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Ongoing"
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  filter: schoolingEventFilterSelectors.filter(state)
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (name, data) =>
    dispatch(schoolingEventFilterActions.updateFilter(name, data))
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventFilter)
);
