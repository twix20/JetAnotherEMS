import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

import ticketActions from '../../actions/ticketActions';

import { connect } from 'react-redux';

import TicketList from '../TicketList';

const styles = () => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

class EventTicketsChooserDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    const ticketId = value.id;

    this.props.buyTicket(ticketId);

    this.props.onClose(value);
  };
  render() {
    const { classes, onClose, selectedValue, tickets, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          Choose a ticket to buy
        </DialogTitle>
        <div>
          <TicketList
            tickets={tickets}
            handleListItemClick={this.handleListItemClick}
          />
        </div>
      </Dialog>
    );
  }
}

const ticketShape = PropTypes.shape({
  bought: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
});

EventTicketsChooserDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: ticketShape,
  tickets: PropTypes.arrayOf(ticketShape).isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  buyTicket: ticketId =>
    dispatch(ticketActions.buyTicketForEventRequest.start({ ticketId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EventTicketsChooserDialog));
