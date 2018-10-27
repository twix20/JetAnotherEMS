import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
    // width: 500
  }
});

class LoginRegisterTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Login" />
            <Tab label="Sign up" />
          </Tabs>
        </AppBar>

        {value === 0 && (
          <TabContainer>
            <LoginForm />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <RegisterForm initialValues={{ account: 'user' }} />
          </TabContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LoginRegisterTabs);
