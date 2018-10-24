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
    account: 'user',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  onSubmitClicked = () => {
    console.log(this.state);
  };

  render() {
    const { email, password, confirmPassword, account } = this.state;

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
            value={email}
            onChange={e => this.handleChange('email', e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            value={password}
            onChange={e => this.handleChange('password', e.target.value)}
            margin="normal"
            type="password"
            fullWidth
          />
          <TextField
            id="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            onChange={e => this.handleChange('confirmPassword', e.target.value)}
            margin="normal"
            type="password"
            fullWidth
          />

          <RadioGroup
            row
            name="account"
            aria-label="account"
            value={account}
            onChange={e => this.handleChange('account', e.target.value)}
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
