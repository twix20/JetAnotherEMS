import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

import { Field } from 'redux-form';
import {
  renderTextField,
  renderMUIPlacesAutocomplete,
  renderCheckBox
} from '../forms';
import { required, email } from 'redux-form-validators';

import TextField from '@material-ui/core/TextField';
import TitleIcon from '@material-ui/icons/Title';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/Subject';
import PublicIcon from '@material-ui/icons/Public';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const styles = theme => ({
  root: {},
  flex: {
    flex: 1
  },
  field: {
    width: '100%'
  },
  fieldItem: {
    marginBottom: theme.spacing.unit
  },
  exp: {
    height: `calc(100% - ${theme.spacing.unit * 3}px)`
  },
  locationContainer: {
    '& input::placeholder': {
      opacity: 1
    }
  }
});

const IconInputTemplate = withStyles(styles)(props => {
  const { classes, Icon, children, className, alignItems } = props;

  return (
    <Grid
      item
      container
      lg={12}
      spacing={8}
      alignItems={alignItems}
      className={classnames(classes.root, classes.fieldItem)}
    >
      <Grid item>
        <Icon />
      </Grid>
      <Grid item className={classnames(classes.flex, className)}>
        {children}
      </Grid>
    </Grid>
  );
});

IconInputTemplate.defaultProps = {
  alignItems: 'center'
};

IconInputTemplate.propTypes = {
  Icon: PropTypes.func.isRequired
};

class EventDetailsTab extends React.Component {
  state = { text: '' };

  handleChange = value => {
    this.setState({ text: value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" className={classes.root}>
        <IconInputTemplate Icon={PublicIcon}>
          <Field
            //className={classes.field}
            name="isPublic"
            component={renderCheckBox}
            label="Is Public"
          />
        </IconInputTemplate>

        <IconInputTemplate Icon={TitleIcon}>
          <Field
            className={classes.field}
            name="eventTitle"
            component={renderTextField}
            label="Event Title"
            validate={[required()]}
          />
        </IconInputTemplate>

        <IconInputTemplate Icon={LocationOnIcon}>
          <div className={classes.locationContainer}>
            <Field
              name="location"
              label="Location"
              autoFocus={false}
              component={renderMUIPlacesAutocomplete}
              textFieldProps={{
                fullWidth: true
              }}
              validate={[required()]}
              createAutocompleteRequest={inputValue => {
                return {
                  input: inputValue,
                  types: ['address']
                };
              }}
            />
          </div>
        </IconInputTemplate>

        <IconInputTemplate Icon={SubjectIcon}>
          <Field
            className={classes.field}
            name="description"
            component={renderTextField}
            label="Description"
            multiline
            fullWidth
          />
        </IconInputTemplate>
      </Grid>
    );
  }
}

EventDetailsTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventDetailsTab);
