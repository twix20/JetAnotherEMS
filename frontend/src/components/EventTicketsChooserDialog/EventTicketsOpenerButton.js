import React from 'react';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';

import EventTicketsChooserDialog from './index';
import TicketCard from './TicketCard';
import Can from '../Can';

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
    const {
      usersTicket,
      availableTickets,
      eventId,
      handleTicketCancel
    } = this.props;

    return (
      <div>
        <Can I="buyTicket" a="SchoolingEvent" passThrough>
          {can => {
            console.log(can);
            if (can) {
              return usersTicket === null ? (
                <Button
                  variant="extendedFab"
                  aria-label="Delete"
                  onClick={this.handleClickOpen}
                >
                  <NavigationIcon />
                  Buy a ticket now!
                </Button>
              ) : (
                <TicketCard
                  ticket={usersTicket}
                  handleTicketCancel={handleTicketCancel}
                />
              );
            } else {
              return <div>Loggin to buy a ticket!</div>;
            }
          }}
        </Can>
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
