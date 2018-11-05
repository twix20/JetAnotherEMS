import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';

class IndeterminateCheckbox extends React.Component {
  state = {
    innerValue: 2,
    value: false
  };

  handleChange = e => {
    const { innerValue } = this.state;
    const { onChange, name } = this.props;

    this.setState(
      {
        innerValue: (innerValue + 1) % 3,
        value: e.target.value
      },
      () => {
        if (onChange) {
          const v = this.isIndeterminate() ? null : this.isChecked();
          onChange(name, v);
        }
      }
    );
  };

  isChecked() {
    return this.state.innerValue === 1;
  }

  isIndeterminate() {
    return this.state.innerValue === 2;
  }

  render() {
    const { value } = this.state;
    const { onChange, ...rest } = this.props;

    return (
      <Checkbox
        checked={this.isChecked()}
        indeterminate={this.isIndeterminate()}
        value={value}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
}

export default IndeterminateCheckbox;
