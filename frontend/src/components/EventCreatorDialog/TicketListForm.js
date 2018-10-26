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
import NoteIcon from '@material-ui/icons/Note';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 450
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
    width: 60
  },
  addContainer: {
    width: 'initial',
    '& button': {
      color: green[800]
    }
  }
});

class TicketListForm extends React.Component {
  handleAddTicket = () => {};

  render() {
    const {
      classes,
      handleSubmit,
      fields,
      reset,
      pristine,
      submitting
    } = this.props;

    console.log('TicketListForm');
    console.log(this.props);
    console.log(fields.getAll());

    const tickets = fields.getAll();

    return (
      <div className={classes.root}>
        <div>
          <Typography variant="title" className={classes.title}>
            Available tickets
          </Typography>
        </div>

        <List>
          {tickets &&
            tickets.map((ticket, index) => (
              <ListItem
                //   button={handleListItemClick}
                //   onClick={() => handleListItemClick(ticket)}
                key={index}
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

                <ListItemSecondaryAction>
                  TODO: Tickets amount
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>

        <Grid container justify="center">
          <Grid item className={classes.inline}>
            <Field
              name="name"
              label="Name"
              component={renderTextField}
              labelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item className={classes.inline}>
            <Field
              name="price"
              label="Price"
              type="number"
              className={classes.numberInput}
              component={renderTextField}
              inputProps={{ type: 'number' }}
              labelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid className={classes.addContainer} item>
            <IconButton
              aria-label="Add"
              color="green"
              color="primary"
              disabled={pristine || submitting}
              onClick={() => {
                handleSubmit();
                reset();
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const validate = () => {
  let errors = {};
  return errors;
};

TicketListForm = withStyles(styles)(TicketListForm);

export default reduxForm({
  form: 'tickets', // a unique identifier for this form
  validate
})(TicketListForm);
