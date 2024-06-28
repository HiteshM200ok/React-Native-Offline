import {isArray} from 'lodash';
import {useMemo} from 'react';
import {DocumentType} from '../Redux/Reducers/PendingDocumentReducer';

type SelectedCountType = {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
};

/**
 * Perform below operations on incoming latest data as a parameter
 * Selected items count
 * No. of items count
 * No. of items count and selected items count are equal or not
 */
export const useSelectedCountHook = (
  data: Array<DocumentType> = [],
): SelectedCountType => {
  return useMemo(() => {
    let selectedCount = 0;
    let totalCount = 0;
    let uploadingCount = 0;

    if (isArray(data)) {
      data.forEach(item => {
        totalCount += 1;
        if (item.isUploading) {
          uploadingCount += 1;
        } else if (item.isSelected) {
          selectedCount += 1;
        }
      });
    }

    return {
      selectedCount,
      totalCount,
      isAllSelected:
        selectedCount >= 1 && totalCount - uploadingCount === selectedCount,
    };
  }, [data]);
};
