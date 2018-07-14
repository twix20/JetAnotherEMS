import React from 'react';

import EventCard from '../EventCard/EventCard';

class EventListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          id: 1,
          title: 'Some fancy Title',
          description: 'Description',
          imageUrl: 'http://via.placeholder.com/350x150'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <EventCard event={this.state.events[0]} />
      </div>
    );
  }
}

export default EventListContainer;
