import React from 'react';

import EventCard from '../EventCard/EventCard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { connect } from 'react-redux';
import schoolingEventActions from '../../actions/schoolingEventActions';
import {
  schoolingEventSelectors,
  createLoadingSelector
} from '../../reducers/selectors';

class EventListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          id: 2,
          title: 'Some fancy Title',
          description: 'Description',
          imageUrl:
            'https://workmax.pl/wp-content/uploads/2018/01/szkolenia-bhp.jpg'
        }
      ]
    };
  }

  componentDidMount() {
    this.props.getMoreFeaturedSchoolingEvents();
  }

  render() {
    const { featuredEvents, loadingFeaturedEvents } = this.props;

    console.log(featuredEvents);
    console.log(loadingFeaturedEvents);
    return (
      <React.Fragment>
        <List>
          {featuredEvents.map((e, i) => (
            <ListItem disableGutters key={i}>
              <EventCard event={e} />
            </ListItem>
          ))}
        </List>

        {loadingFeaturedEvents && <div>Loading loadingFeaturedEvents</div>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  featuredEvents: schoolingEventSelectors.featured(state),
  loadingFeaturedEvents: createLoadingSelector([
    schoolingEventActions.getFeaturedSchoolingEventsRequest.type
  ])(state)
});

const mapDispatchToProps = dispatch => ({
  getMoreFeaturedSchoolingEvents: () => {
    dispatch(schoolingEventActions.getMoreFeaturedSchoolingEvents);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListContainer);
