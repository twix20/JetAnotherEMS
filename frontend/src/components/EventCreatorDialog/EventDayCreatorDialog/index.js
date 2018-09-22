import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import { TimePicker } from 'material-ui-pickers';

import moment from 'moment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TitleIcon from '@material-ui/icons/Title';
import SchoolIcon from '@material-ui/icons/School';
import SubjectIcon from '@material-ui/icons/Subject';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import LabelIcon from '@material-ui/icons/Label';

import Grid from '@material-ui/core/Grid';
import TagsPicker from '../../TagsPicker/TagsPicker';

const styles = theme => ({
  paper: {
    maxWidth: 'unset',
    overflow: 'visible',
    maxWidth: '600px'
  },
  timePicker: {
    flex: 1,
    '&:not(:first-child)': {
      marginBottom: theme.spacing.unit,
      marginLeft: '5%'
    }
  },
  formIconContainer: {
    width: 40
  },
  formFieldContainer: {
    width: 'unset',
    flexGrow: 1
  },
  dialogContent: {
    overflow: 'visible'
  }
});

const FormItem = withStyles(styles)(props => {
  const { classes, icon: Icon, children, ...rest } = props;

  return (
    <Grid item container spacing={8} alignItems="baseline" {...rest}>
      <Grid item className={classes.formIconContainer}>
        <Icon />
      </Grid>
      <Grid item container className={classes.formFieldContainer}>
        {children}
      </Grid>
    </Grid>
  );
});

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

    const textFields = [
      {
        icon: TitleIcon,
        id: 'title',
        label: 'Title',
        textFieldProps: {}
      },
      {
        icon: SchoolIcon,
        id: 'teacher',
        label: 'Teacher',
        textFieldProps: {}
      },
      {
        icon: MeetingRoomIcon,
        id: 'lecture-room',
        label: 'Lecture room',
        textFieldProps: {}
      },
      {
        icon: SubjectIcon,
        id: 'description',
        label: 'Description',
        textFieldProps: {
          multiline: true,
          rows: 4
        }
      }
    ];

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
        <DialogContent className={classes.dialogContent}>
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

            {textFields.map((t, i) => (
              <FormItem key={i} icon={t.icon}>
                <TextField
                  label={t.label}
                  id={t.id}
                  // value={newTicket.name}
                  // onChange={this.handleNewTicketInputChange("name")}
                  fullWidth
                  margin="dense"
                  {...t.textFieldProps}
                  // InputLabelProps={{
                  //   shrink: true
                  // }}
                />
              </FormItem>
            ))}

            <FormItem icon={LabelIcon}>
              <TagsPicker />
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
