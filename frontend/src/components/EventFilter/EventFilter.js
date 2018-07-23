import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SuperSelectField from 'material-ui-superselectfield';

import Button from '@material-ui/core/Button';
import Explicit from '@material-ui/icons/Explicit';
import Card from '@material-ui/core/Card';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Typography from '@material-ui/core/Typography';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import TagsPicker from '../TagsPicker/TagsPicker';

import './EventFilter.scss';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class EventFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amountFrom: 0,
      amountTo: 150,
      multiLabel: null
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleSelection(values, name) {
    console.log(name);
    console.log(values);
  }

  handlePriceChange = prop => event => {
    console.log(prop);
    this.setState({ [prop]: event.target.value });
  };

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className="eventFilter__card">
        <Grid container justify="center" className="eventFilter__container">
          <Grid item className="eventFilter__section">
            <div className="eventFilter__title">Location</div>

            <div>
              <SuperSelectField
                name="state11"
                hintText="Single value"
                //   value={state11}

                onChange={this.handleSelection}
                style={{ minWidth: 150, margin: 10 }}
              >
                {Array.apply(null, { length: 20 }).map((e, i) => (
                  <div value={i}>Option {i}</div>
                ))}
              </SuperSelectField>
            </div>
          </Grid>
          <Grid item className="eventFilter__section">
            <div className="eventFilter__title">Date range</div>
            <div className="eventFilter__dateContainer">
              <div className="eventFilter__dateLabel">from</div>
              <TextField
                className="eventFilter__datePicker"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className="eventFilter__dateContainer">
              <div className="eventFilter__dateLabel">to</div>
              <TextField
                className="eventFilter__datePicker"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Grid>
          <Grid item className="eventFilter__section">
            <div className="eventFilter__title">Price Range</div>
            <div className="eventFilter__price">
              ${this.state.amountFrom} - ${this.state.amountTo}
            </div>
            <div className="eventFilter__priceInputContainer">
              <div className="eventFilter__priceInput">
                <Input
                  value={this.state.amountFrom}
                  onChange={this.handlePriceChange('amountFrom')}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </div>

              <div className="eventFilter__priceInputDivider">to</div>

              <div className="eventFilter__priceInput">
                <Input
                  value={this.state.amountTo}
                  onChange={this.handlePriceChange('amountTo')}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </div>
            </div>
          </Grid>
          <Grid item className="eventFilter__section">
            <div className="eventFilter__title">tags</div>
            <TagsPicker className="eventFilter__tagsPicker" />
            <div />
          </Grid>
          <Grid
            item
            className="eventFilter__section eventFilter__section--small"
          >
            <div className="eventFilter__title">Matching results</div>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                className="eventCard__tickets__button"
              >
                23
                <Explicit className={classes.rightIcon} />
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EventFilter);
