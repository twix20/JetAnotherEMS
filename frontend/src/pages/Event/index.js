import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DefaultLayout from '../../layouts/Default';
import Grid from '@material-ui/core/Grid';
import EventTabs from '../../components/EventTabs';
import EventDetailsCard from '../../components/EventDetailsCard';
import EventCreatorOpenerButton from '../../components/EventCreatorOpenerButton';

const styles = theme => ({
  cardMargin: {
    margin: theme.spacing.unit * 3
  }
});

class EventPage extends React.Component {
  state = {
    eventId: this.props.match.params.id,
    event: {
      id: this.props.match.params.id,
      startDate: new Date(2018, 11, 24, 10, 33)
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <DefaultLayout>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8}>
            <div className={classes.cardMargin}>
              <EventCreatorOpenerButton mode="edit" />
              <EventDetailsCard />
            </div>
            <EventTabs />
          </Grid>
        </Grid>
      </DefaultLayout>
    );
  }
}

export default withStyles(styles)(EventPage);
