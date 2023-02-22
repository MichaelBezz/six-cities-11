import {AxiosError} from 'axios';
import {toast} from 'react-toastify';

type APIError = AxiosError<{error: string}>;

const ERROR_NETWORK = 'ERR_NETWORK';

export const processErrorHandle = (error: APIError): void => {
  if (error.code === ERROR_NETWORK) {
    toast.error('Server is not available. Please try one more time.');
  }
};
