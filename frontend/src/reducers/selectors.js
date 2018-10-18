import _ from 'lodash';

export { selectors as schoolingEventSelectors } from './schoolingEvent';
export { selectors as scheduleSelectors } from './schedule';
export {
  selectors as schoolingEventFilterSelectors
} from './schoolingEventFilterReducer';

export const createLoadingSelector = actions => state => {
  // returns true only when all actions is not loading
  const isLoading = _(actions).some(action =>
    _.get(state, `loading.${action}.loading`)
  );

  return isLoading;
};
