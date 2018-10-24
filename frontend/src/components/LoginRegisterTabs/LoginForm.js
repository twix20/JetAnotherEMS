import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormTemplate from './FormTemplate';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({});

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    rememberMe: true
  };

  onSubmitClicked = () => {
    const { loginWithCredentials } = this.props;
    const { email, password, rememberMe } = this.state;

    loginWithCredentials(email, password, rememberMe);
  };

  handleInputChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <FormTemplate
          title="Welcome back!"
          subTitle={'Log in to manage your events and buy tickets'}
          submitButtonText="Login"
          onSubmit={this.onSubmitClicked}
        >
          <TextValidator
            label="Email"
            onChange={e => this.handleInputChange('email', e)}
            name="email"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            fullWidth
          />

          <TextValidator
            label="Password"
            onChange={e => this.handleInputChange('password', e)}
            name="password"
            value={password}
            validators={['required']}
            errorMessages={['this field is required']}
            fullWidth
          />
        </FormTemplate>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loginWithCredentials: (email, password, rememberMe) =>
    dispatch(
      authActions.postLoginWithCredentialsRequest.start({
        email,
        password,
        rememberMe
      })
    )
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);
