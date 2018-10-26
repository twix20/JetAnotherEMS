import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../forms';

import TextField from '@material-ui/core/TextField';
import TitleIcon from '@material-ui/icons/Title';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/Subject';

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
  quillContainer: {
    height: '100%',
    '& .ql-editor': {
      width: '100%',
      overflowY: 'scroll',
      maxHeight: '600px',
      minHeight: '200px'
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
        <IconInputTemplate Icon={TitleIcon}>
          <Field
            className={classes.field}
            name="eventTitle"
            component={renderTextField}
            label="Event Title"
          />
        </IconInputTemplate>

        <IconInputTemplate Icon={LocationOnIcon}>
          <Field
            className={classes.field}
            name="location"
            component={renderTextField}
            label="Location"
          />
        </IconInputTemplate>

        <IconInputTemplate
          Icon={SubjectIcon}
          className={classes.exp}
          alignItems="baseline"
        >
          <ReactQuill
            theme="snow"
            placeholder={'Description'}
            className={classes.quillContainer}
            value={this.state.text}
            onChange={this.handleChange}
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
