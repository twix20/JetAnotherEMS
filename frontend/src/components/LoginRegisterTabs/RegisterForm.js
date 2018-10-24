import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormTemplate from './FormTemplate';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({});

class RegisterForm extends React.Component {
  state = {
    account: 'user'
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  onSubmitClicked = () => {
    console.log('click');
  };

  render() {
    const { account } = this.state;

    return (
      <div>
        <FormTemplate
          title="Register now!"
          subTitle={'Exclusive venues and discounts are at your fingertips'}
          submitButtonText="Register"
          onSubmit={this.onSubmitClicked}
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
            type="password"
            fullWidth
          />
          <TextField
            id="confirmPassword"
            label="Confirm password"
            // value={this.state.name}
            margin="normal"
            fullWidth
          />

          <RadioGroup
            row
            name="account"
            aria-label="account"
            value={account}
            onChange={this.handleChange('account')}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Company"
            />
          </RadioGroup>
        </FormTemplate>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterForm);
