import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormTemplate from './FormTemplate';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({});

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <FormTemplate
          title="Welcome back!"
          subTitle={'Log in to manage your events and buy tickets'}
          submitButtonText="Login"
        >
          <TextField
            id="email"
            label="Email"
            // value={this.state.email}
            margin="normal"
            fullWidth
          />

          <TextField
            id="password"
            label="Password"
            // value={this.state.name}
            margin="normal"
            fullWidth
          />
        </FormTemplate>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
