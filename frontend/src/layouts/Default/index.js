import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/Header/Header';
import EventListContainer from '../../components/EventListContainer/EventListContainer';
import EventFilter from '../../components/EventFilter/EventFilter';
import Grid from '@material-ui/core/Grid';
import { Parallax, Background } from 'react-parallax';

const styles = theme => ({
  '@global': {
    html: {
      padding: '0'
    },
    body: {
      backgroundColor: theme.palette.background.default
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
