import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import TicketList from '../TicketList';
import green from '@material-ui/core/colors/green';

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
    const { classes } = this.props;
    const { tickets, newTicket } = this.state;

    const ticketListActions = props => {
      // const { classes } = props;
      const { total, name } = props;
      return (
        <TextField
          id="outlined-number"
          label="Total"
          className={classes.totalTickets}
          value={total}
          onChange={this.handleTotalChange(name)}
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
      );
    };

    return (
      <div className={classes.root}>
        <div>
          <Typography variant="title" className={classes.title}>
            Available tickets
          </Typography>
        </div>
        <div className={classes.demo}>
          <TicketList
            handleListItemClick={this.handleListItemClick}
            tickets={tickets}
            actions={ticketListActions}
          />
          <Grid container justify="center">
            <Grid item className={classes.inline}>
              <TextField
                label="Name"
                id="margin-normal"
                value={newTicket.name}
                onChange={this.handleNewTicketInputChange('name')}
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item className={classes.inline}>
              <TextField
                id="new-price"
                label="Price"
                className={classes.numberInput}
                value={newTicket.price}
                onChange={this.handleNewTicketInputChange('price')}
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>

            <Grid
              className={classes.addContainer}
              item
              container
              direction="column"
              justify="center"
            >
              <IconButton
                aria-label="Add"
                color="green"
                color="primary"
                onClick={this.handleAddTicket}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TicketListCreator);
