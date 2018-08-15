import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/Header/Header';

const styles = theme => ({
  '@global': {
    html: {
      padding: '0'
    },
    body: {
      backgroundColor: theme.palette.background.default
    },

    '.rc-slider': {
      '& .rc-slider-handle': {
        borderColor: theme.palette.primary.light,
        '&:active': {
          boxShadow: `0 0 5px ${theme.palette.primary.dark}`
        }
      },
      '& .rc-slider-track': {
        backgroundColor: theme.palette.primary.light
      }
    }
  },
  root: {}
});

class DefaultLayout extends React.Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />

        {children}
      </div>
    );
  }
}

export default withStyles(styles)(DefaultLayout);
