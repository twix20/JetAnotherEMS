import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/Header/Header';
import CssBaseline from '@material-ui/core/CssBaseline';

// general styles
import 'react-responsive-carousel/lib/styles/main.css';

// carousel styles
import 'react-responsive-carousel/lib/styles/carousel.css';

const styles = theme => ({
  '@global': {
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
    },
    h2: {
      borderTop: 'none'
    }
  },
  root: {}
});

class DefaultLayout extends React.Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <Header />

        {children}
      </div>
    );
  }
}

export default withStyles(styles)(DefaultLayout);
