import { notify } from 'reapop';

const defaultNotification = {
  position: 'tr',
  dismissAfter: 1000,
  closeButton: true
};

export default {
  default: props =>
    notify({ status: 'default', ...defaultNotification, ...props }),
  info: props => notify({ status: 'info', ...defaultNotification, ...props }),
  success: props =>
    notify({ status: 'success', ...defaultNotification, ...props }),
  warning: props =>
    notify({ status: 'warning', ...defaultNotification, ...props }),
  error: props => notify({ status: 'error', ...defaultNotification, ...props })
};
