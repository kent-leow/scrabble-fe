import {
  displayErrorToast,
  displaySuccessToast,
} from '~/utils/helpers/toast.helper';
import { AsyncFunction } from 'type-fest/source/async-return-type';

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
