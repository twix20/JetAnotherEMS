import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { change as changleFieldValue } from 'redux-form';
import BigCalendar from 'react-big-calendar-like-google';
import moment from 'moment';
import { createRandomGuid } from '../../services/randomService';
import EventDayCreatorDialog from './EventDayCreatorDialog';

const styles = theme => ({
  root: {
    '& .rbc-time-content': {
      maxHeight: '500px'
    }
  }
});

class EventCalendar extends React.Component {
  state = {
    dayCreator: {
      open: false,
      slotInfo: null
    }
  };

  closeDayCreator = () => {
    this.setState({
      dayCreator: {
        ...this.state.dayCreator,
        slotInfo: null,
        open: false
      }
    });
  };

  handleCancel = () => {
    this.setState({
      dayCreator: {
        ...this.state.dayCreator,
        slotInfo: null,
        open: false
      }
    });
  };

  handleDelete = dayId => {
    console.log('Id like to delete');
    console.log(dayId);

    let allEvents = this.props.fields.getAll();
    const events = allEvents.filter(x => x.id !== dayId);
    this.props.fields.removeAll();
    events.forEach(e => this.props.fields.push(e));

    this.closeDayCreator();
  };

  handleCreateNewDay = values => {
    console.log('handleCreateNewDay');
    console.log(values);

    const newEvent = {
      ...values,
      id: values.id || createRandomGuid(),
      end: values.end.toDate(),
      start: values.start.toDate()
    };

    const dayId = newEvent.id;
    let allEvents = this.props.fields.getAll();
    let events = allEvents.filter(x => x.id !== dayId);
    events.push(newEvent);

    console.log(events);
    console.log(this.props);

    this.props.dispatch(
      changleFieldValue(this.props.meta.form, 'calendar', events)
    );

    this.closeDayCreator();
  };

  render() {
    const { dayCreator } = this.state;
    const { classes, events } = this.props;

    const { handleSubmit, pristine, reset, submitting, fields } = this.props;

    return (
      <div {...this.props}>
        <div className={classes.root}>
          <BigCalendar
            selectable
            showMultiDayTimes={false}
            events={events}
            defaultView="week"
            views={['day', 'week']}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onLeftMenu={e => console.log(e)}
            onSelectEvent={event => {
              this.setState({
                dayCreator: {
                  ...this.state.dayCreator,
                  slotInfo: event,
                  open: true
                }
              });
            }}
            onSelectSlot={
              slotInfo =>
                this.setState({
                  dayCreator: {
                    ...this.state.dayCreator,
                    slotInfo,
                    open: true
                  }
                })

              // alert(
              //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              //     `\nend: ${slotInfo.end.toLocaleString()}` +
              //     `\naction: ${slotInfo.action}`
              // )
            }
          />

          {dayCreator.open &&
            dayCreator.slotInfo && (
              <EventDayCreatorDialog
                open={dayCreator.open}
                initialValues={{
                  ...dayCreator.slotInfo,
                  start: moment(dayCreator.slotInfo.start),
                  end: moment(dayCreator.slotInfo.end),
                  bgColor: '#ff7f50'
                }}
                onDelete={this.handleDelete}
                onCancel={this.handleCancel}
                onSubmit={this.handleCreateNewDay}
              />
            )}
        </div>
      </div>
    );
  }
}

EventCalendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect()(EventCalendar));
