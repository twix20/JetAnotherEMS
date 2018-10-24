import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormTemplate from './FormTemplate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import authActions from '../../actions/authActions';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../../reducers/selectors';
import { POST_REGISTER_WITH_CREDENTIALS_REQUEST } from '../../constants/actionTypes';

const styles = theme => ({});

class RegisterForm extends React.Component {
  state = {
    account: 'user',
    email: '',
    password: '',
    confirmPassword: ''
  };

  componentWillMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { email, password, confirmPassword, account } = this.state;

    this.props.register(email, password, confirmPassword, account);
  };

  render() {
    const { email, password, confirmPassword, account } = this.state;

    const { isSubmiting } = this.props;

    return (
      <FormTemplate
        title="Register now!"
        subTitle={'Exclusive venues and discounts are at your fingertips'}
        submitButtonText="Register"
        submitButtonIsLoading={isSubmiting}
        onSubmit={this.handleSubmit}
      >
        <TextValidator
          label="Email"
          onChange={this.handleChange}
          name="email"
          value={email}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
          fullWidth
        />

        <TextValidator
          label="Password"
          onChange={this.handleChange}
          name="password"
          type="password"
          validators={['required']}
          errorMessages={['this field is required']}
          value={password}
          fullWidth
        />

        <TextValidator
          label="Confirm password"
          onChange={this.handleChange}
          name="confirmPassword"
          type="password"
          validators={['isPasswordMatch', 'required']}
          errorMessages={['password mismatch', 'this field is required']}
          value={confirmPassword}
          fullWidth
        />

        <RadioGroup
          row
          name="account"
          aria-label="account"
          value={account}
          onChange={this.handleChange}
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel
            value="company"
            control={<Radio />}
            label="Company"
          />
        </RadioGroup>
      </FormTemplate>
    );
  }
}

const mapStateToProps = state => ({
  isSubmiting: createLoadingSelector([POST_REGISTER_WITH_CREDENTIALS_REQUEST])(
    state
  )
});

const mapDispatchToProps = dispatch => ({
  register: (email, password, confirmPassword, account) =>
    dispatch(
      authActions.postRegisterWithCredentialsRequest.start({
        email,
        password,
        confirmPassword,
        account
      })
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RegisterForm));
