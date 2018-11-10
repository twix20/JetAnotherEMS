import React from 'react';

import FeaturedEventCard from '../FeaturedEventCard/FeaturedEventCard';
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

  handleFollowClick = event => {
    const newFollowStatus = !event.isFollowing;
    console.log(event);
    console.log(newFollowStatus);

    this.props.changeFollow(event.id, newFollowStatus);
  };

  render() {
    const { featuredEvents, loadingFeaturedEvents } = this.props;

    return (
      <React.Fragment>
        <List>
          {featuredEvents.map((featuredEvent, index) => (
            <ListItem disableGutters key={index}>
              <FeaturedEventCard
                event={featuredEvent}
                onFollowClicked={clickEvent =>
                  this.handleFollowClick(featuredEvent)
                }
              />
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
  },
  changeFollow: (eventId, newFollowStatus) => {
    dispatch(
      schoolingEventActions.changeSchoolingEventFollow.start({
        eventId,
        newFollowStatus
      })
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListContainer);
