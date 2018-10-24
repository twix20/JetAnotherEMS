import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormTemplate from './FormTemplate';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import authActions from '../../actions/authActions';

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
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={e => this.handleInputChange('email', e)}
            margin="normal"
            fullWidth
          />

          <TextField
            id="password"
            label="Password"
            value={password}
            onChange={e => this.handleInputChange('password', e)}
            type="password"
            margin="normal"
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
