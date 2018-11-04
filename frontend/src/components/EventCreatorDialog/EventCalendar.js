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
    },
    files: []
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
    let allEvents = this.props.fields.getAll();
    const events = allEvents.filter(x => x.id !== dayId);
    this.props.fields.removeAll();
    events.forEach(e => this.props.fields.push(e));

    this.closeDayCreator();
  };

  handleCreateNewDay = values => {
    values.attachments = values.attachments || [];
    const newEvent = {
      ...values,
      id: values.id || createRandomGuid(),
      end: values.dateEnd.toDate(),
      start: values.dateStart.toDate(),
      attachments: values.attachments.map(a => {
        return {
          serverId: a.serverId,
          name: a.file.name,
          size: a.file.size,
          type: a.file.type,
          origin: 'local'
        };
      })
    };

    const dayId = newEvent.id;
    let allEvents = this.props.fields.getAll() || [];
    let events = allEvents.filter(x => x.id !== dayId);
    events.push(newEvent);

    this.props.dispatch(
      changleFieldValue(this.props.meta.form, 'calendar', events)
    );

    this.closeDayCreator();
  };

  render() {
    const { dayCreator } = this.state;
    const { classes, events } = this.props;

    return (
      <div className={classes.root} {...this.props}>
        <BigCalendar
          toolbar={true}
          //timeslots={5}
          selectable
          showMultiDayTimes={true}
          events={events}
          defaultView="week"
          views={['day', 'week']}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          //onLeftMenu={e => console.log(e)}
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
                dateStart: moment(dayCreator.slotInfo.start),
                dateEnd: moment(dayCreator.slotInfo.end),
                bgColor: '#ff7f50'
              }}
              onDelete={this.handleDelete}
              onCancel={this.handleCancel}
              onSubmit={this.handleCreateNewDay}
            />
          )}
      </div>
    );
  }
}

EventCalendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect()(EventCalendar));
