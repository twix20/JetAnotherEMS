import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BigCalendar from 'react-big-calendar-like-google';

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
    events: [
      {
        title: 'All Day Event very long title',
        bgColor: '#ff7f50',
        // allDay: true,
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 1)
      },
      {
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10)
      },

      {
        title: 'DTS STARTS',
        bgColor: '#dc143c',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0)
      },

      {
        title: 'DTS ENDS',
        bgColor: '#ff8c00',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0)
      },

      {
        title: 'Some Event',
        bgColor: '#9932cc',
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 9, 0, 0, 0)
      },
      {
        title: 'Conference',
        bgColor: '#e9967a',
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 11),
        desc: 'Big conference for important people'
      },
      {
        title: 'Meeting',
        bgColor: '#8fbc8f',
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
      },
      {
        title: 'Lunch',
        bgColor: '#cd5c5c',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
      },
      {
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch happy hour'
      },
      {
        title: 'Meeting',
        bgColor: '#da70d6',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0)
      },
      {
        title: 'Happy Hour',
        bgColor: '#eee8aa',
        start: new Date(2015, 3, 17, 17, 0, 0, 0),
        end: new Date(2015, 3, 17, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
      },
      {
        title: 'Dinner',
        bgColor: '#98fb98',
        start: new Date(2015, 3, 15, 20, 0, 0, 0),
        end: new Date(2015, 3, 15, 21, 0, 0, 0)
      },
      {
        title: 'Birthday Party',
        bgColor: '#afeeee',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0)
      },
      {
        title: 'Birthday Party 2',
        bgColor: '#db7093',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0)
      },
      {
        title: 'Birthday Party 3',
        bgColor: '#cd853f',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0)
      }
    ]
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

  handleOk = event => {
    console.log(event);

    this.setState({
      dayCreator: {
        ...this.state.dayCreator,
        slotInfo: null,
        open: false
      }
    });
  };

  render() {
    const { events, dayCreator } = this.state;
    const { classes } = this.props;

    return (
      <div {...this.props}>
        <div className={classes.root}>
          <BigCalendar
            selectable
            showMultiDayTimes={false}
            events={events}
            defaultView="week"
            views={['day', 'week', 'month']}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2015, 3, 12)}
            onSelectEvent={event => alert(event.title)}
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

          {dayCreator.open && (
            <EventDayCreatorDialog
              open={dayCreator.open}
              slotInfo={dayCreator.slotInfo}
              onCancel={this.handleCancel}
              onOk={this.handleOk}
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

export default withStyles(styles)(EventCalendar);
