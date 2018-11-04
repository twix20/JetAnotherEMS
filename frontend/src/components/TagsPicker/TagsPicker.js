import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';

import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import api from '../../services/api';

const styles = theme => ({
  root: {
    flexGrow: 1
    // height: 250
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 3,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class TagsPicker extends React.Component {
  state = {
    value: null,
    suggestions: [],
    isLoading: false
  };

  componentDidMount() {
    if (this.props.value) this.setState({ value: this.props.value });
  }

  handleChange = value => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }

    this.setState({
      value
    });
  };

  handleInputChange = value => {
    this.setState({ isLoading: true }, () => {
      this.fetchSuggestions(value).then(r => {
        const newSuggestions = r.data.data.map(e => ({
          value: e.value,
          label: e.value,
          description: e.description
        }));

        this.setState({
          suggestions: newSuggestions,
          isLoading: false
        });
      });
    });
  };

  fetchSuggestions = query => api.tags.search({ query });

  render() {
    const { classes, theme, canCreate, name } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit'
        }
      })
    };

    let label = '';
    let shrink = false;

    if (this.state.value && this.state.value.length > 0) {
      shrink = true;
      label = 'Tags';
    }

    const SelectComponent = canCreate ? Creatable : Select;

    return (
      <div className={classes.root}>
        <NoSsr>
          <SelectComponent
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: label,
              InputLabelProps: {
                shrink: shrink
              }
            }}
            options={this.state.suggestions}
            components={components}
            value={this.state.value}
            onChange={this.handleChange}
            filterOption={(option, rawinput) => true}
            onInputChange={this.handleInputChange}
            placeholder={'Select multiple tags'}
            isMulti
            isLoading={this.state.isLoading}
            noOptionsMessage={inputValue => 'Start typing...'}
          />
        </NoSsr>
      </div>
    );
  }
}

TagsPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

TagsPicker.defaultProps = {
  canCreate: false
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TagsPicker)
);
