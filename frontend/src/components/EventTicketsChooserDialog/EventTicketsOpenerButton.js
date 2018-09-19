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

const availableTickets = [
  {
    id: 'fdeeca12-c708-476d-81b5-a8554bfff8b3',
    bought: 2,
    left: 30,
    price: 10.0,
    currency: 'PLN'
  },
  {
    id: '41c25bfd-b2b4-4e14-b23c-9f39c7f72cf4',
    bought: 1,
    left: 10,
    price: 0.0,
    currency: 'PLN'
  }
];

class EventTicketsOpenerButton extends React.Component {
  state = {
    open: false,
    selectedValue: availableTickets[0]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Typography variant="subheading">
          Selected ticket id: {this.state.selectedValue.id}
        </Typography>
        <br />
        <Button
          variant="extendedFab"
          aria-label="Delete"
          onClick={this.handleClickOpen}
        >
          <NavigationIcon />
          Buy a ticket now!
        </Button>

        <EventTicketsChooserDialog
          tickets={availableTickets}
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default EventTicketsOpenerButton;
