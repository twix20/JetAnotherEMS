import { API_URL } from '../../config/urls';

export default {
  downloadUrl: ({ id }) => `${API_URL}/File/${id}/Download`
};
