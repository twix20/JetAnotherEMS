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
  render() {
    const { id } = this.props.match.params;
    const { classes } = this.props;

    return (
      <DefaultLayout>
        <Grid container>
          <div className={classes.cardMargin}>
            <EventCreatorOpenerButton mode="edit" eventId={id} />
            <EventDetailsCard eventId={id} />
          </div>
          <EventTabs eventId={id} />
        </Grid>
      </DefaultLayout>
    );
  }
}

export default withStyles(styles)(EventPage);
