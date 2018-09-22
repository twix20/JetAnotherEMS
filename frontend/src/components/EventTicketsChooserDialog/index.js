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

import NoteIcon from '@material-ui/icons/Note';

import TicketList from '../TicketList';

const styles = theme => ({
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

export default withStyles(styles)(EventTicketsChooserDialog);
