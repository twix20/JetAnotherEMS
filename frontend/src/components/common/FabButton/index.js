import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500]
  }
});

//Mode: edit, add
class FabButton extends React.Component {
  render() {
    const { classes, mode, ...rest } = this.props;

    const fabModes = {
      add: {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />
      },
      edit: {
        color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />
      }
    };
    const fab = fabModes[mode];

    return (
      <Zoom in={true} style={{ transitionDelay: 500 }}>
        <Button
          variant="fab"
          className={fab.className}
          color={fab.color}
          {...rest}
        >
          {fab.icon}
        </Button>
      </Zoom>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FabButton);
