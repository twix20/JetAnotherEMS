import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DefaultLayout from '../../layouts/Default';
import Grid from '@material-ui/core/Grid';
import EventTabs from '../../components/EventTabs';
import EventDetailsCard from '../../components/EventDetailsCard';
import EventCreatorOpenerButton from '../../components/EventCreatorOpenerButton';
import Can from '../../components/Can';
import { SchoolingEvent } from '../../models';
import { schoolingEventSelectors } from '../../reducers/selectors';
import schoolingEventActions from '../../actions/schoolingEventActions';

import { connect } from 'react-redux';

const styles = theme => ({
  cardMargin: {
    margin: theme.spacing.unit * 3,
    width: '100%'
  }
});

class EventPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { fetchEvent } = this.props;

    fetchEvent(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { classes, eventById } = this.props;

    const event = eventById(id);

    if (!event) return <div>Loading...</div>;

    const schoolingEvent = new SchoolingEvent({ ...event });

    return (
      <DefaultLayout>
        <Grid container>
          <div className={classes.cardMargin}>
            <Can I="update" of={schoolingEvent}>
              <EventCreatorOpenerButton mode="edit" eventId={id} />
            </Can>

            <EventDetailsCard eventId={id} />
          </div>
          <EventTabs event={event} />
        </Grid>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = state => ({
  eventById: id => schoolingEventSelectors.eventById(state, id)
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: id =>
    dispatch(schoolingEventActions.getEventRequest.start({ id }))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventPage)
);
