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
import IndeterminateCheckbox from '../IndeterminateCheckbox';

import TagsPicker from '../TagsPicker/TagsPicker';

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
  handlePriceChange = range => {
    this.handleFilterChange('priceFrom', range[0]);
    this.handleFilterChange('priceTo', range[1]);
  };

  handleDateChange = (name, newDate) => {
    this.props.updateFilter(name, newDate);
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.handleFilterChange(name, value);
  };

  handleFilterChange = (name, value) => {
    this.props.updateFilter(name, value);
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
              Tags
            </Typography>

            <TagsPicker
              value={filter.tags}
              onChange={v => this.handleFilterChange('tags', v)}
            />
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
              name={'dateStart'}
              value={filter.dateStart}
              clearable
              onChange={date => this.handleDateChange('dateStart', date)}
              animateYearScrolling={false}
            />

            <DatePicker
              className={classes.datePicker}
              autoOk
              label="To"
              name={'dateEnd'}
              value={filter.dateEnd}
              clearable
              onChange={date => this.handleDateChange('dateEnd', date)}
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
                  ${filter.priceFrom} - ${filter.priceTo}
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
                label="Favorites"
                control={
                  <IndeterminateCheckbox
                    name="onlyFavorites"
                    onChange={this.handleFilterChange}
                  />
                }
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                label="Private"
                control={
                  <IndeterminateCheckbox
                    name="onlyPrivate"
                    onChange={this.handleFilterChange}
                  />
                }
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                label="Created by me"
                control={
                  <IndeterminateCheckbox
                    name="onlyMy"
                    onChange={this.handleFilterChange}
                  />
                }
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
