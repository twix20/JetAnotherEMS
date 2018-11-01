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

import MUIPlacesAutocomplete, {
  geocodeBySuggestion
} from 'mui-places-autocomplete';
import { classNames } from 'classnames';

import { FilePond, File, registerPlugin } from 'react-filepond';
import AceEditor from 'react-ace';

export const renderTextField = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
);

export const renderCheckBox = ({
  input: { checked, name, onChange, ...restInput },
  meta,
  ...rest
}) => (
  <Checkbox
    {...rest}
    name={name}
    InputProps={restInput}
    onChange={onChange}
    checked={!!checked}
  />
);

export const renderTimePicker = ({
  input: { checked, name, onChange, value, ...restInput },
  meta,
  label,
  ...rest
}) => {
  const error = meta.error && meta.touched;
  return (
    <FormControl error={Boolean(error)} {...rest}>
      <InputLabel shrink={true}>{label}</InputLabel>
      <TimePicker
        onChange={onChange}
        value={!value ? null : new Date(value)}
        {...restInput}
      />
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};

export const renderFileUploader = ({
  input: { onChange, ...restInput },
  meta,
  initialFiles,
  name,
  ...rest
}) => {
  const error = meta.error && meta.touched;
  return (
    <div style={{ width: '100%' }} name={name}>
      {error && <div>{error}</div>}
      <FilePond onupdatefiles={fileItems => onChange(fileItems)} {...rest}>
        {initialFiles &&
          initialFiles.map(({ serverId, ...restFile }, index) => (
            <File key={index} src={serverId} {...restFile} />
          ))}
      </FilePond>
    </div>
  );
};

export const renderMUIPlacesAutocomplete = ({ input, ...other }) => {
  return (
    <MUIPlacesAutocomplete
      onSuggestionSelected={suggestion => {
        geocodeBySuggestion(suggestion).then(results => {
          if (results.length < 1) {
            return;
          }

          // Just use the first result in the list to get the geometry coordinates
          const { geometry } = results[0];

          suggestion.lat = geometry.location.lat();
          suggestion.lng = geometry.location.lng();

          input.onChange(suggestion);
        });
      }}
      renderTarget={() => <div />}
      {...other}
    />
  );
};

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

export const renderAceEditor = ({ input, ...custom }) => {
  return (
    <AceEditor
      value={input.value}
      {...custom}
      onChange={value => input.onChange(value)}
    />
  );
};
