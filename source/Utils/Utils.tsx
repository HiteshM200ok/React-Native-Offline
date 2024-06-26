import {get, isArray, isPlainObject} from 'lodash';

export const getGuid = () => {
  return 'xxxxxxxx-xxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};

export const EventRegisterKeys = {
  onOfflineDocument: '#onOfflineDocument',
  documentSendToPending: '#DocumentSendToPending',
  documentUpload: '#DocumentUpload',
};

export const updateArrayOfObject = ({
  array = [],
  compairBy = '',
  data = {},
  type = 'add',
  index = -1,
  replaceData = null,
  isAddDataPrepend = false,
}: {
  array: Array<any>;
  compairBy?: string;
  data?: object;
  type?: 'add' | 'update' | 'remove' | 'add-update';
  index?: number;
  replaceData?: object | null;
  isAddDataPrepend?: boolean;
}) => {
  if (!isArray(array)) {
    return [];
  }
  if (type === 'add') {
    return isAddDataPrepend ? [data, ...array] : [...array, data];
  }

  let foundIndex =
    index > -1
      ? index
      : array.findIndex(item => get(item, compairBy) === get(data, compairBy));

  if (foundIndex >= 0) {
    if (type === 'update' || type === 'add-update') {
      return [
        ...array.slice(0, foundIndex),
        isPlainObject(replaceData) ? replaceData : data,
        ...array.slice(foundIndex + 1),
      ];
    } else if (type === 'remove') {
      return [...array.slice(0, foundIndex), ...array.slice(foundIndex + 1)];
    }
  }

  if (type === 'add-update') {
    return isAddDataPrepend ? [data, ...array] : [...array, data];
  }
  return array;
};
