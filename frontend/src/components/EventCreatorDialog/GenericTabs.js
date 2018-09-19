import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: `calc(100% - ${theme.spacing.unit * 3}px)`
  },
  tabContainer: {
    padding: theme.spacing.unit * 3,
    borderRight: '#e0e0e0 1px solid',
    borderTop: '#e0e0e0 1px solid',
    flex: 1,
    height: `calc(100% - ${theme.spacing.unit * 3}px)`
  }
});

const TabContainer = withStyles(styles)(props => {
  const { className, classes } = props;

  return (
    <Typography
      className={classnames(className, classes.tabContainer)}
      component="div"
    >
      {props.children}
    </Typography>
  );
});

class GenericTabs extends React.Component {
  state = {
    activeTab: 0
  };

  handleChange = (event, activeTab) => {
    this.setState({ activeTab }, () => {
      const { onTabChange } = this.props;

      if (onTabChange) onTabChange(this.state.activeTab);
    });
  };

  render() {
    const { tabs, classes } = this.props;
    const { activeTab } = this.state;

    const tabToDisplay = tabs[activeTab];

    return (
      <div className={classes.root}>
        <Paper elevation={0}>
          <Tabs
            value={activeTab}
            onChange={this.handleChange}
            indicatorColor="secondary"
          >
            {tabs.map((t, i) => <Tab key={i} label={t.label} />)}
          </Tabs>
        </Paper>

        <TabContainer>{tabToDisplay.content()}</TabContainer>
      </div>
    );
  }
}

GenericTabs.propTypes = {
  onTabChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.func.isRequired
    })
  ).isRequired
};

export default withStyles(styles)(GenericTabs);
