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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import NoteIcon from '@material-ui/icons/Note';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

class TicketList extends React.Component {
  render() {
    const { classes, tickets, handleListItemClick, actions } = this.props;

    return (
      <List>
        {tickets.sort((a, b) => a.price - b.price).map((ticket, i) => (
          <ListItem
            button={handleListItemClick}
            onClick={() => handleListItemClick(ticket)}
            key={i}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <NoteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${ticket.name} - ${ticket.price}${ticket.currency}`}
              secondary={ticket.left ? `${ticket.left} tickets left` : null}
            />
            {actions && (
              <ListItemSecondaryAction>
                {actions(ticket)}

                {/* {React.cloneElement(actions, { ...ticket })} */}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    );
  }
}

TicketList.defaultProps = {
  handleListItemClick: ticket => {}
};

TicketList.propTypes = {
  tickets: PropTypes.array.isRequired
};

export default withStyles(styles)(TicketList);
