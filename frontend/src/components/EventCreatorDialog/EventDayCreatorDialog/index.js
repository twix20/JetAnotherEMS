import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { TimePicker } from 'material-ui-pickers';

import moment from 'moment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TitleIcon from '@material-ui/icons/Title';
import SchoolIcon from '@material-ui/icons/School';
import SubjectIcon from '@material-ui/icons/Subject';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import LabelIcon from '@material-ui/icons/Label';
import AttachmentIcon from '@material-ui/icons/Attachment';

import Grid from '@material-ui/core/Grid';
import TagsPicker from '../../TagsPicker/TagsPicker';
import AttachmentsUploader from '../../AttachmentsUploader';

import { connect } from 'react-redux';
import { change as changleFieldValue } from 'redux-form';
import {
  renderTextField,
  renderTimePicker,
  renderFileUploader,
  renderTagsPicker
} from '../../forms';
import { Form, Field } from 'react-final-form';

import { required } from '../../forms/validators';

import 'filepond/dist/filepond.min.css';

const styles = theme => ({
  paper: {
    maxWidth: 'unset',
    maxWidth: '600px'
  },
  timePicker: {
    flex: 1,
    '& label': {
      top: '-14px'
    },
    '&:not(:first-child)': {
      marginBottom: theme.spacing.unit,
      marginLeft: '5%'
    }
  },
  formContainer: {
    position: 'relative'
  },
  formIconContainer: {
    width: 40
  },
  formFieldContainer: {
    width: 'unset',
    flexGrow: 1,
    maxWidth: 'calc(100% - 40px)',
    marginTop: theme.spacing.unit * 2
  },
  dialogContent: {
    overflow: 'visible',
    minHeight: 200
  }
});

const FormItem = withStyles(styles)(props => {
  const { classes, icon: Icon, children, alignItems, ...rest } = props;

  return (
    <Grid
      item
      container
      className={classes.formContainer}
      spacing={8}
      alignItems={alignItems}
      {...rest}
    >
      <Grid item className={classes.formIconContainer}>
        <Icon />
      </Grid>
      <Grid item container className={classes.formFieldContainer}>
        {children}
      </Grid>
    </Grid>
  );
});

FormItem.defaultProps = {
  alignItems: 'baseline'
};

FormItem.propTypes = {
  icon: PropTypes.func.isRequired
};

class EventDayCreatorDialog extends React.Component {
  handleEntering = () => {};

  render() {
    const {
      classes,
      open,
      onCancel,
      onDelete,
      onSubmit,
      initialValues: { dateStart, id, attachments }
    } = this.props;

    const formItems = [
      {
        icon: AccessTimeIcon,
        name: 'time',
        label: 'Time',
        children: () => {
          return (
            <React.Fragment>
              <Field
                name="dateStart"
                label="From"
                component={renderTimePicker}
                type="text"
                className={classes.timePicker}
                validate={required}
              />

              <Field
                name="dateEnd"
                label="To"
                component={renderTimePicker}
                type="text"
                className={classes.timePicker}
                validate={required}
              />
            </React.Fragment>
          );
        }
      },
      {
        icon: TitleIcon,
        label: 'Title',
        name: 'title',
        custom: {
          fullWidth: true,
          validate: required
        }
      },
      {
        icon: SchoolIcon,
        label: 'Teacher',
        name: 'teacher',
        custom: {
          fullWidth: true,
          validate: required
        }
      },
      {
        icon: MeetingRoomIcon,
        label: 'Lecture room',
        name: 'lectureRoom',
        custom: {
          fullWidth: true,
          validate: required
        }
      },
      {
        icon: LabelIcon,
        name: 'tagsPicker',
        label: 'Tags',
        children: () => {
          return <Field name="tags" canCreate component={renderTagsPicker} />;
        }
      },
      {
        icon: SubjectIcon,
        label: 'Description',
        name: 'description',
        custom: {
          multiline: true,
          rows: 4,
          fullWidth: true,
          validate: required
        }
      },
      {
        icon: AttachmentIcon,
        name: 'attachments',
        label: 'Attachments',
        children: () => {
          return (
            <Field
              name="attachments"
              component={renderFileUploader}
              initialFiles={attachments}
              allowMultiple={true}
              maxFiles={3}
              filepondRef={ref => (this.filepondRef = ref)}
            />
          );
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
        scroll={'paper'}
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">
          Day {dateStart && dateStart.format('DD/MM')}
        </DialogTitle>
        <Form
          validate={validate}
          initialValues={this.props.initialValues}
          onSubmit={values => {
            const filepondFiles = this.filepondRef.getFiles();
            const filepondFilesById = filepondFiles.reduce((acc, f) => {
              acc[f.id] = f;
              return acc;
            }, {});
            values.attachments = values.attachments
              ? values.attachments
                  .map(a => {
                    a.serverId = filepondFilesById[a.id].serverId;
                    return a;
                  })
                  .filter(x => !!x.serverId)
              : [];

            onSubmit(values);
          }}
          render={({
            handleSubmit,
            form,
            reset,
            submitting,
            pristine,
            values
          }) => (
            <div>
              <DialogContent className={classes.dialogContent}>
                <Grid container>
                  {formItems.map((t, index) => (
                    <FormItem key={index} {...t}>
                      {t.children ? (
                        t.children()
                      ) : (
                        <Field
                          name={t.name}
                          label={t.label}
                          component={renderTextField}
                          type="text"
                          {...t.custom}
                        />
                      )}
                    </FormItem>
                  ))}
                </Grid>
                <DialogActions>
                  <Grid container justify="space-between">
                    <Grid item>
                      {id && (
                        <Button onClick={() => onDelete(id)}>Delete</Button>
                      )}
                    </Grid>
                    <Grid item>
                      <Button onClick={onCancel} color="primary">
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        type="button"
                        onClick={() => {
                          form.submit();
                        }}
                        disabled={submitting || pristine}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </DialogContent>
            </div>
          )}
        />
      </Dialog>
    );
  }
}
const validate = values => {
  let errors = {};

  if (values.dateStart && values.dateEnd) {
    if (values.dateStart.isAfter(values.dateEnd)) {
      errors.dateStart = 'Starting time must be earlier than ending date';
      errors.dateEnd = ' ';
    }
  }

  return errors;
};

EventDayCreatorDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired
  // slotInfo: PropTypes.object.isRequired
};

EventDayCreatorDialog = withStyles(styles)(EventDayCreatorDialog);
EventDayCreatorDialog = connect()(EventDayCreatorDialog);
export default EventDayCreatorDialog;
