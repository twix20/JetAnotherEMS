import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';

import { TicketStatus, enumPropFromValue } from '../../constants/enums';

const styles = {
  card: {
    minWidth: 345
  },
  aprovedCard: {
    color: green[100]
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
  },
  actions: {
    justifyContent: 'center'
  }
};

class TicketCard extends React.Component {
  getCardModeFromTicketStatus = () => {
    const { ticket } = this.props;

    const cardModes = {
      [TicketStatus.Approved]: {
        content: null,
        actions: null
      },
      [TicketStatus.AwaitingApproval]: {
        content: 'Awaiting aproval',
        actions: (
          <Button fullWidth size="small" color="primary" variant="contained">
            Cancel
          </Button>
        )
      },
      [TicketStatus.Rejected]: {
        content: 'Your ticket request has been rejected',
        actions: null
      }
    };

    return cardModes[ticket.status];
  };

  render() {
    const { classes, ticket } = this.props;

    const cardMode = this.getCardModeFromTicketStatus();

    const cardSubHeaderText = `${ticket.ticket.name} - ${ticket.ticket.price}${
      ticket.ticket.currency
    }`;

    return (
      <Card className={classes.card}>
        <Grid container>
          <Grid
            item
            xs={cardMode.actions || cardMode.content ? 6 : 12}
            container
            justify="center"
            direction="column"
          >
            <CardHeader title="Ticket" subheader={cardSubHeaderText} />
          </Grid>
          <Grid item xs={6}>
            {cardMode.content && (
              <CardContent>
                <Typography component="p" variant="body2">
                  {cardMode.content}
                </Typography>
              </CardContent>
            )}

            {cardMode.actions && (
              <CardActions className={classes.actions}>
                {cardMode.actions}
              </CardActions>
            )}
          </Grid>
        </Grid>
      </Card>
    );
  }
}

TicketCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TicketCard);
