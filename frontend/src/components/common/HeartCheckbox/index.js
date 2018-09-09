import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({});

function HeartCheckbox(props) {
  const { onChange, labelText, id, className } = props;

  return (
    <div className={className}>
      <Checkbox
        id={id}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        value="checkedH"
        onChange={onChange}
      />
      {labelText && <label htmlFor={id}>{labelText}</label>}
    </div>
  );
}

HeartCheckbox.propTypes = {
  labelText: PropTypes.string
};

export default withStyles(styles)(HeartCheckbox);
