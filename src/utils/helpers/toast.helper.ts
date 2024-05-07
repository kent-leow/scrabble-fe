import { toast, ToastOptions } from 'react-toastify';
import { isAxiosError } from 'axios';

const toastSettings: ToastOptions = {
  autoClose: 2500,
  closeButton: true,
  draggable: false,
  hideProgressBar: false,
  position: 'top-center',
};

export const displayErrorToast = (e: unknown) => {
  if (isAxiosError(e)) {
    const error = e.response?.data.message;
    const errorMessage = Array.isArray(error) ? error.join(', ') : error;
    toast(errorMessage, { type: 'error', ...toastSettings });
  } else if (e instanceof Error) {
    toast(e.message, { type: 'error', ...toastSettings });
  }
};

export const displaySuccessToast = (message: string) => {
  toast(message, { type: 'success', ...toastSettings });
};
