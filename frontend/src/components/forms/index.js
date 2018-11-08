import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

import TagsPicker from '../TagsPicker/TagsPicker';

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
  input: { value, name, onChange, ...restInput },
  meta,
  label,
  labelProps,
  ...rest
}) => (
  <FormControlLabel
    {...labelProps}
    label={label}
    control={
      <Checkbox
        {...rest}
        name={name}
        inputProps={restInput}
        onChange={onChange}
        checked={!!value}
        value="checkedF"
      />
    }
  />
);

export const renderTimePicker = ({
  input: { name, onChange, value, ...restInput },
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
  server,
  filepondRef,
  ...rest
}) => {
  const error = meta.error && meta.touched;

  let serverProp = {
    url: 'https://localhost:44364/api/File/',
    process: {
      url: 'Upload',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    ...server
  };

  return (
    <div style={{ width: '100%' }} name={name}>
      {error && <div>{error}</div>}
      <FilePond
        ref={ref => filepondRef && filepondRef(ref)}
        onupdatefiles={fileItems =>
          onChange(
            fileItems.map(f => ({
              id: f.id,
              serverId: f.serverId,
              name: f.file.name,
              size: f.file.size,
              type: f.file.type,
              origin: 'local'
            }))
          )
        }
        server={serverProp}
        {...rest}
      >
        {initialFiles &&
          initialFiles.map(({ serverId, ...restFile }, index) => (
            <File key={index} src={serverId} {...restFile} />
          ))}
      </FilePond>
    </div>
  );
};

export const renderMUIPlacesAutocomplete = ({
  input: { value, onChange, ...restInput },
  textFieldProps,
  label,
  ...other
}) => {
  return (
    <MUIPlacesAutocomplete
      textFieldProps={{
        placeholder: value.description
          ? value.description
          : 'Search for a place',
        label: label,
        InputLabelProps: {
          shrink: !!value.description
        },
        ...textFieldProps
      }}
      onSuggestionSelected={suggestion => {
        geocodeBySuggestion(suggestion).then(results => {
          if (results.length < 1) {
            return;
          }

          // Just use the first result in the list to get the geometry coordinates
          const { geometry } = results[0];

          suggestion.lat = geometry.location.lat();
          suggestion.lng = geometry.location.lng();

          onChange(suggestion);
        });
      }}
      renderTarget={() => <div />}
      label={label}
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

export const renderTagsPicker = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <TagsPicker
      onChange={value => input.onChange(value)}
      value={input.value}
      {...custom}
    />
  );
};

export const renderAceEditor = ({ input, ...custom }) => {
  return (
    <AceEditor
      value={input.value}
      {...custom}
      onChange={value => input.onChange(value)}
    />
  );
};
