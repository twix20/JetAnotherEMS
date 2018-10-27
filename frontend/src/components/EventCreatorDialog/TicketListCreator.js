import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { renderTextField } from '../forms';
import TicketListForm from './TicketListForm';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 310
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing.unit
  },
  inline: {
    display: 'inline-block',
    marginRight: theme.spacing.unit
  },
  totalTickets: {
    width: 60
  },
  numberInput: {
    width: 40
  },
  addContainer: {
    width: 'initial',
    '& button': {
      color: green[800]
    }
  }
});

class TicketListCreator extends React.Component {
  initialNewItcket = {
    price: 0,
    total: 1,
    name: '',
    currency: 'PLN'
  };

  state = {
    tickets: [
      {
        left: 20,
        total: 100,
        name: 'VIP2',
        currency: 'PLN',
        price: 100
      },
      {
        left: 2,
        total: 50,
        name: 'VIP',
        currency: 'PLN',
        price: 10
      },
      {
        left: 20,
        total: 100,
        name: 'REGULAR',
        currency: 'PLN',
        price: 0
      }
    ],
    newTicket: this.initialNewItcket
  };

  handleListItemClick = e => {
    console.log(e);
  };

  handleAddTicket = () => {
    console.log(this.state.newTicket);
    //TODO: add new ticket UI validation, change to forms?

    this.setState(
      currentState => ({
        tickets: [...currentState.tickets, this.state.newTicket]
      }),
      () => {
        this.setState({
          newTicket: this.initialNewItcket
        });
      }
    );
  };

  handleNewTicketInputChange = inputName => event => {
    event.persist();
    this.setState(currentState => ({
      newTicket: {
        ...currentState.newTicket,
        [inputName]: event.target.value
      }
    }));
  };

  handleTotalChange = ticketName => event => {
    event.persist();

    this.setState(currentState => ({
      tickets: [
        ...currentState.tickets.filter(t => t.name !== ticketName),
        {
          ...currentState.tickets.find(t => t.name === ticketName),
          total: event.target.value
        }
      ]
    }));
  };

  render() {
    const ren = props => (
      <TicketListForm
        {...props}
        onSubmit={v => {
          const newTicket = {
            left: 10,
            currency: 'PLN',
            ...v
          };

          props.fields.push(newTicket);
        }}
      />
    );

    return <FieldArray name="tickets" component={ren} />;
  }
}

export default withStyles(styles)(TicketListCreator);
