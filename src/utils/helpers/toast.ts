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
  if (isAxiosError(e))
    toast(e.response?.data.message, { type: 'error', ...toastSettings });
  else if (e instanceof Error)
    toast(e.message, { type: 'error', ...toastSettings });
};

export const displaySuccessToast = (message: string) => {
  toast(message, { type: 'success', ...toastSettings });
};
