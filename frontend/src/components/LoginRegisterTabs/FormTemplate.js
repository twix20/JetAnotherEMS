import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { reduxForm, Field } from 'redux-form';

const styles = theme => ({
  submitBtn: {
    '&:hover': {
      bottom: theme.spacing.unit / 4
    }
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 2
  }
});

class FormTemplate extends React.Component {
  render() {
    const {
      classes,
      children,
      title,
      subTitle,
      submitButtonText,
      onSubmit,
      submitButtonProps,
      submitting
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <Typography align="center" variant="title">
          {title}
        </Typography>
        <Typography align="center" variant="caption">
          {subTitle}
        </Typography>

        {children}

        <div className={classes.actionContainer}>
          {submitting ? (
            <CircularProgress />
          ) : (
            <Button
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              className={classes.submitBtn}
              {...submitButtonProps}
            >
              {submitButtonText}
            </Button>
          )}
        </div>
      </form>
    );
  }
}

FormTemplate.defaultProps = {
  submitButtonProps: {},
  submitting: false
};

FormTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(FormTemplate);
