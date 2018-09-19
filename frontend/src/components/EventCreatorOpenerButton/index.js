import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EventCreatorDialog from '../EventCreatorDialog';
import FabButton from '../common/FabButton';

const styles = theme => {};

class EventCreatorOpenerButton extends React.Component {
  state = {
    eventCreatorOpen: true
  };

  handleFabClick = () => {
    this.setState({
      eventCreatorOpen: true
    });
  };
  handleEventCreatorClose = () => {
    this.setState({
      eventCreatorOpen: false
    });
  };

  render() {
    const { eventCreatorOpen } = this.state;
    const { mode } = this.props;

    return (
      <div>
        <EventCreatorDialog
          open={eventCreatorOpen}
          handleClose={this.handleEventCreatorClose}
        />

        <FabButton mode={mode} onClick={this.handleFabClick} />
      </div>
    );
  }
}

export default withStyles(styles)(EventCreatorOpenerButton);
