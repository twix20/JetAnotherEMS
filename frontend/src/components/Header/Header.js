import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import LoginRegisterTabs from '../LoginRegisterTabs';
import authActions from '../../actions/authActions';
import { selectors as authSelectors } from '../../reducers/auth';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.white
    }
  }
});

class Header extends React.Component {
  state = {
    auth: false,
    anchorEl: null,
    openLoginRegisterDialog: false
  };

  componentDidMount() {
    const { user } = this.props;

    console.log(user);

    this.setState({ auth: Boolean(user) });
  }

  goToHome = () => {
    this.props.history.push('/');
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.handleClose();
    this.props.logout();
  };

  //Login/Register dialog
  handleClickOpenDialog = () => {
    this.setState({
      openLoginRegisterDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({ openLoginRegisterDialog: false });
  };

  render() {
    const { classes, user } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Hidden xsDown>
                <Button
                  color="inherit"
                  onClick={this.goToHome}
                  disableRipple
                  variant="text"
                >
                  Event Managment System
                </Button>
              </Hidden>
            </Typography>

            {user ? (
              <React.Fragment>
                <Typography component="div" variant="title" color="inherit">
                  {user.email}
                </Typography>

                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <div>
                <Button color="inherit" onClick={this.handleClickOpenDialog}>
                  Login / Register
                </Button>

                <Dialog
                  open={this.state.openLoginRegisterDialog}
                  onClose={this.handleCloseDialog}
                >
                  <LoginRegisterTabs />
                </Dialog>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: authSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Header)));
