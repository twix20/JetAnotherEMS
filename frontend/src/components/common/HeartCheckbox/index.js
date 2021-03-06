import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';

import red from '@material-ui/core/colors/red';

const styles = theme => ({
  root: {
    color: red[600],
    '&:checked': {
      color: `${red[500]} !important`
    }
  }
});

function HeartCheckbox(props) {
  const {
    classes,
    onChange,
    labelText,
    id,
    className,
    checkboxClassName,
    ...rest
  } = props;

  return (
    <div className={className}>
      <Checkbox
        id={id}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        color="default"
        value="checkedH"
        className={checkboxClassName}
        classes={{
          root: classes.root,
          checked: classes.checked
        }}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

HeartCheckbox.propTypes = {
  labelText: PropTypes.string
};

export default withStyles(styles)(HeartCheckbox);
