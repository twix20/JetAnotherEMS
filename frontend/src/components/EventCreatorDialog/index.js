import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CreatorTabs from './CreatorTabs';
import TicketTabs from './TicketTabs';

import schoolingEventActions from '../../actions/schoolingEventActions';

import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  flexedCalendar: {
    flex: 2
  },
  contentContainer: {
    width: '100%',
    height: '100%'
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EventCreatorDialog extends React.Component {
  state = {
    tabSelected: 0
  };

  handleTabChange = i => {
    this.setState({ tabSelected: i });
  };

  render() {
    const {
      classes,
      events,
      open,
      handleClose,
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props;
    const { tabSelected } = this.state;

    const submit = handleSubmit(
      schoolingEventActions.createOrUpdateSchoolingEvent
    );

    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <form onSubmit={submit}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  Event creator
                </Typography>
                <Button
                  type="submit"
                  disabled={pristine || submitting}
                  color="inherit"
                  // onClick={handleClose}
                >
                  save
                </Button>
              </Toolbar>
            </AppBar>

            <Grid
              container
              direction="column"
              className={classes.contentContainer}
            >
              {/* <Grid item>DODAJ TYTUŁ</Grid> */}

              <Grid item container className={classes.flex}>
                <Grid
                  item
                  className={classnames(classes.flex, {
                    [classes.flexedCalendar]: tabSelected === 1
                  })}
                >
                  <CreatorTabs
                    events={events}
                    onTabChange={this.handleTabChange}
                  />
                </Grid>
                <Grid item className={classes.flex}>
                  <TicketTabs />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Dialog>
      </div>
    );
  }
}

EventCreatorDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

const selector = formValueSelector('eventCreatorFrom');

const mapStateToProps = state => ({
  events: selector(state, 'calendar')
    ? selector(state, 'calendar').map(e => {
        e.bgColor = '#ff7f50';
        return e;
      })
    : []
});

const mapDispatchToProps = dispatch => ({});

EventCreatorDialog = withStyles(styles)(EventCreatorDialog);

EventCreatorDialog = reduxForm({
  form: 'eventCreatorFrom' // a unique identifier for this form
})(EventCreatorDialog);

EventCreatorDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCreatorDialog);

export default EventCreatorDialog;
