import _ from 'lodash';

export { selectors as schoolingEventSelectors } from './schoolingEvent';
export { selectors as scheduleSelectors } from './schedule';
export { selectors as userTicketsSelectors } from './userTicketsReducer';
export {
  selectors as schoolingEventFilterSelectors
} from './schoolingEventFilterReducer';

export const createLoadingSelector = actions => state => {
  // returns true only when all actions is not loading
  const isLoading = _(actions).some(action => {
    if (typeof action === 'string') {
      return _.get(state, `loading.${action}.loading`);
    }

    const { type, predicate } = action;

    const actionTypeState = state.loading[type];

    if (!actionTypeState) return false;

    return actionTypeState.loading && predicate(actionTypeState);
  });

  return isLoading;
};
