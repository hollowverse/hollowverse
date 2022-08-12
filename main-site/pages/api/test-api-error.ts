import { apiHandlerWithErrorLogging } from '~/lib/a/apiHandlerWithErrorLogging';

const handler = async () => {
  throw new Error('API throw error test');
};

export default apiHandlerWithErrorLogging('test-api-error', handler);
