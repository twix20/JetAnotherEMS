import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import NavigationIcon from '@material-ui/icons/Navigation';

import EventTicketsChooserDialog from './index';
import TicketCard from './TicketCard';

class EventTicketsOpenerButton extends React.Component {
  state = {
    open: false,
    selectedTicket: null
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({
      selectedTicket: value,
      open: false
    });
  };

  render() {
    const { selectedTicket } = this.state;
    const { usersTicket, availableTickets, eventId } = this.props;

    console.log(selectedTicket);
    console.log(usersTicket);

    return (
      <div>
        {usersTicket === null ? (
          <Button
            variant="extendedFab"
            ariaLabel="Delete"
            onClick={this.handleClickOpen}
          >
            <NavigationIcon />
            Buy a ticket now!
          </Button>
        ) : (
          <TicketCard ticket={usersTicket} />
        )}
        <EventTicketsChooserDialog
          eventId={eventId}
          tickets={availableTickets}
          selectedValue={this.state.selectedTicket}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default EventTicketsOpenerButton;
