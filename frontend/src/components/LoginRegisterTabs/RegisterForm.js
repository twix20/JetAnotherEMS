import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, Field } from 'redux-form';
import { renderTextField, renderRadioGroup, renderRadio } from '../forms';

import FormTemplate from './FormTemplate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import authActions from '../../actions/authActions';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../../reducers/selectors';
import { POST_REGISTER_WITH_CREDENTIALS_REQUEST } from '../../constants/actionTypes';

const styles = theme => ({});

class RegisterForm extends React.Component {
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const submit = handleSubmit(authActions.registerWithCredentials);

    return (
      <FormTemplate
        title="Register now!"
        subTitle={'Exclusive venues and discounts are at your fingertips'}
        submitButtonText="Register"
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
        />

        <Field
          label="Password"
          name="password"
          fullWidth
          component={renderTextField}
          inputProps={{
            type: 'password'
          }}
        />

        <Field
          label="Confirm password"
          name="confirmPassword"
          fullWidth
          component={renderTextField}
          inputProps={{
            type: 'password'
          }}
        />

        <Field name="account" component={renderRadioGroup} />

        <Field
          name="account"
          component={renderRadioGroup}
          row
          aria-label="account"
        >
          {renderRadio({ value: 'user', label: 'User', checked: true })}
          {renderRadio({ value: 'company', label: 'Company' })}
        </Field>
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

RegisterForm = withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterForm)
);

export default reduxForm({
  form: 'register'
})(RegisterForm);
