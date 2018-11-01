/* eslint-disable */
import React from 'react';
import TextField from '@material-ui/core/TextField';
/* eslint-enable */
import { ValidatorComponent } from 'react-form-validator-core';

import { TimePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

export default class DateTimeValidator extends ValidatorComponent {
  render() {
    /* eslint-disable no-unused-vars */
    const {
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      withRequiredValidator,
      value,
      label,
      name,
      onChange,
      ...rest
    } = this.props;
    const { isValid } = this.state;

    const errorMessage = this.getErrorMessage();
    return (
      // <TextField
      //     {...rest}
      //     error={!isValid || error}
      //     helperText={(!isValid && this.getErrorMessage()) || helperText}
      // />
      <FormControl error={!isValid} {...rest}>
        <InputLabel shrink={true}>{label}</InputLabel>
        <TimePicker
          onChange={onChange}
          value={!value ? null : new Date(value)}
        />
        {!isValid ? <FormHelperText>{errorMessage}</FormHelperText> : null}
      </FormControl>
    );
  }
}
