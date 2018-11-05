import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, Field } from 'redux-form';
import { renderTextField } from '../forms';
import FormTemplate from './FormTemplate';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import { createLoadingSelector } from '../../reducers/selectors';
import { POST_LOGIN_WITH_CREDENTIALS_REQUEST } from '../../constants/actionTypes';
import { required, email } from 'redux-form-validators';

const styles = theme => ({});

class LoginForm extends React.Component {
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const submit = handleSubmit(authActions.login);

    return (
      <FormTemplate
        title="Welcome back!"
        subTitle={'Log in to manage your events and buy tickets'}
        submitButtonText="Login"
        onSubmit={submit}
        submitting={submitting}
        submitButtonProps={{
          disabled: pristine || submitting
        }}
      >
        <Field
          label="Email"
          name="email"
          fullWidth
          component={renderTextField}
          validate={[required(), email()]}
        />

        <Field
          label="Password"
          name="password"
          fullWidth
          component={renderTextField}
          validate={[required()]}
          type="password"
        />
      </FormTemplate>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

LoginForm = withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);

export default reduxForm({
  form: 'login'
})(LoginForm);
