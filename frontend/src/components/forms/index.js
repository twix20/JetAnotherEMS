import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from '@material-ui/core/Checkbox';
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { TimePicker } from 'material-ui-pickers';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AttachmentsUploader from '../AttachmentsUploader';

import MUIPlacesAutocomplete from 'mui-places-autocomplete';

export const renderTextField = ({
  input,
  inputProps,
  label,
  labelProps,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <FormControl error={Boolean(touched && error)} {...custom}>
      <InputLabel {...labelProps}>{label}</InputLabel>
      <Input {...input} {...inputProps} />
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};

export const renderMUIPlacesAutocomplete = ({ input, ...other }) => {
  return <div />;
  //TODO: fix
  return (
    <MUIPlacesAutocomplete
      onSuggestionSelected={sugestion => input.onChange(sugestion)}
      renderTarget={() => <div />}
      textFieldProps={{ ...other }}
    />
  );
};

export const renderTimePicker = ({
  input: { onChange, value },
  label,
  meta: { error },
  ...custom
}) => {
  return (
    <FormControl error={Boolean(error)} {...custom}>
      <InputLabel shrink={true}>{label}</InputLabel>
      <TimePicker onChange={onChange} value={!value ? null : new Date(value)} />
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};

export const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);

export const renderRadioGroup = ({ input, children, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  >
    {children}
  </RadioGroup>
);

export const renderRadio = ({ value, label, ...rest }) => (
  <FormControlLabel control={<Radio />} value={value} label={label} {...rest} />
);

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    error={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
