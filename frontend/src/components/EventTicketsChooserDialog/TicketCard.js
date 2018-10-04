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
  render() {
    const { classes, status } = this.props;

    const cardModes = {
      approved: {
        content: null,
        actions: null
      },
      awaitingAproval: {
        content: 'Awaiting aproval',
        actions: (
          <Button fullWidth size="small" color="primary" variant="contained">
            Cancel
          </Button>
        )
      },
      rejected: {
        content: 'Your ticket request has been rejected',
        actions: null
      }
    };

    const cardMode = cardModes[status];

    return (
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={6} container justify="center" direction="column">
            <CardHeader title="Ticket" subheader="VIP - 200PLN" />
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
  classes: PropTypes.object.isRequired,
  status: PropTypes.oneOf(['approved', 'awaitingAproval', 'rejected'])
    .isRequired
};

export default withStyles(styles)(TicketCard);
