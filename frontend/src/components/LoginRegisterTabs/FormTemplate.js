import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  submitBtn: {
    marginTop: theme.spacing.unit * 2,
    '&:hover': {
      bottom: theme.spacing.unit / 4
    }
  }
});

class FormTemplate extends React.Component {
  render() {
    const { classes, children, title, subTitle, submitButtonText } = this.props;

    return (
      <div>
        <Typography align="center" variant="title">
          {title}
        </Typography>
        <Typography align="center" variant="caption">
          {subTitle}
        </Typography>

        {children}

        <Button
          fullWidth
          color="primary"
          variant="contained"
          className={classes.submitBtn}
        >
          {submitButtonText}
        </Button>
      </div>
    );
  }
}

FormTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired
};

export default withStyles(styles)(FormTemplate);
