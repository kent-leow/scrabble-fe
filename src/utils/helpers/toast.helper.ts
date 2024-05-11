import { cssTransition, toast, ToastOptions } from 'react-toastify';
import { isAxiosError } from 'axios';

const toastSettings: ToastOptions = {
  autoClose: 2000,
  closeButton: true,
  draggable: false,
  hideProgressBar: true,
  position: 'top-center',
  transition: cssTransition({
    enter: 'animate__animated animate__flipInX',
    exit: 'animate__animated animate__flipOutX',
  }),
};

export const displayErrorToast = (e: unknown) => {
  if (isAxiosError(e)) {
    let errorMessage;
    if (e.response?.data.errors && e.response?.data.errors.length) {
      errorMessage = e.response?.data.errors[0].defaultMessage;
    } else {
      const error = e.response?.data.message;
      errorMessage = Array.isArray(error) ? error.join(', ') : error;
    }
    toast(errorMessage, { type: 'error', ...toastSettings });
  } else if (e instanceof Error) {
    toast(e.message, { type: 'error', ...toastSettings });
  }
};

export const displaySuccessToast = (message: string) => {
  toast(message, { type: 'success', ...toastSettings });
};
