import { AsyncFunction } from 'type-fest/source/async-return-type';
import {
  displayErrorToast,
  displaySuccessToast,
} from '~/utils/helpers/toast.helper';

export const promiseWithToast = async (
  promise: AsyncFunction,
  successToastMsg?: string,
) => {
  try {
    await promise();
    if (successToastMsg) {
      displaySuccessToast(successToastMsg);
    }
  } catch (e: unknown) {
    displayErrorToast(e);
  }
};
