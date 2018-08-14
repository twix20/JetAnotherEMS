import React from 'react';
import DefaultLayout from '../../layouts/Default';
import Grid from '@material-ui/core/Grid';
import EventTabs from '../../components/EventTabs';

class EventPage extends React.Component {
  state = {
    eventId: this.props.match.params.id,
    event: {
      id: this.props.match.params.id,
      startDate: new Date(2018, 11, 24, 10, 33)
    }
  };

  render() {
    const { startDate } = this.state.event;

    return (
      <DefaultLayout>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8}>
            Event Page {startDate.toISOString().substring(0, 10)}
            <EventTabs />
          </Grid>
        </Grid>
      </DefaultLayout>
    );
  }
}

export default EventPage;
