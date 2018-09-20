import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { TimePicker } from 'material-ui-pickers';

import moment from 'moment';

import DateRangeIcon from '@material-ui/icons/DateRange';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    maxWidth: 'unset'
  },
  timePicker: {
    flex: 1,
    '&:not(:first-child)': {
      marginBottom: theme.spacing.unit,
      marginLeft: '5%'
    }
  }
});

const FormItem = props => {
  const { icon: Icon, children, ...rest } = props;

  return (
    <Grid item container spacing={8} alignItems="flex-end" {...rest}>
      <Grid item lg={1}>
        <Icon />
      </Grid>
      <Grid item lg={11} container>
        {children}
      </Grid>
    </Grid>
  );
};

FormItem.propTypes = {
  icon: PropTypes.func.isRequired
};

class EventDayCreatorDialog extends React.Component {
  state = {
    date: {
      from: null,
      to: null
    }
  };

  handleEntering = () => {
    console.log(this.props);

    const { slotInfo } = this.props;
    if (slotInfo) {
      this.setState({
        date: {
          from: moment(slotInfo.start),
          to: moment(slotInfo.end)
        }
      });
    }
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
    const { classes, open, onCancel, onOk, slotInfo } = this.props;

    console.log(slotInfo);

    return (
      <Dialog
        classes={{
          paper: classes.paper
        }}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">
          Day {moment(slotInfo.start).format('DD/MM')}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <FormItem icon={AccessTimeIcon}>
              <TimePicker
                className={classes.timePicker}
                autoOk
                label="From"
                value={this.state.date.from}
                onChange={newDate => this.handleDateChange(newDate, 'from')}
              />

              <TimePicker
                className={classes.timePicker}
                autoOk
                label="To"
                value={this.state.date.to}
                onChange={newDate => this.handleDateChange(newDate, 'to')}
              />
            </FormItem>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onOk(this.state)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EventDayCreatorDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  slotInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(EventDayCreatorDialog);
