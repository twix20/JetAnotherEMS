import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
      borderTop: 'none',
      padding: 0
    }
  },
  root: {},
  content: {
    display: 'flex',
    justifyContent: 'center'
  },
  contentContainer: {
    maxWidth: 1600,
    margin: theme.spacing.unit
  }
});

class DefaultLayout extends React.Component {
  render() {
    const { children, classes, aboveContent } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <CssBaseline />

        {aboveContent}

        <div className={classes.content}>
          <div className={classes.contentContainer}>{children}</div>
        </div>
      </div>
    );
  }
}

DefaultLayout.defaultProps = {
  aboveContent: <div />
};

export default withStyles(styles)(DefaultLayout);
