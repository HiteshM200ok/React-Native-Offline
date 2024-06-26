import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCompletedDocuments,
  toggleAllCompleteSelection,
  toggleCompleteSelection,
} from '../../Redux/Reducers/CompletedDocumentReducer';
import {IStoreState} from '../../Redux/Store/ReduxConfigStore';
import {Alert} from 'react-native';
import {useSelectedCountHook} from '../../Hooks/SelectedCountHook';
import {DocumentType} from '../../Redux/Reducers/PendingDocumentReducer';

export const useCompletedScreen = () => {
  const counterRef = useRef<Array<any>>([]);
  const intervalRef = useRef<any>(null);
  const dispatch = useDispatch();

  const completedDocuments = useSelector(
    (state: IStoreState) => state.CompletedDocumentReducer,
  );

  const {selectedCount, isAllSelected} =
    useSelectedCountHook(completedDocuments);

  /**
   * Remove the selected completed request from CompletedDocumentReducer
   */
  const clearAllDoc = useCallback(() => {
    Alert.alert('Delete?', 'Are you sure you want to delete?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(clearCompletedDocuments());
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            counterRef.current = [];
          }
        },
      },
    ]);
  }, [dispatch]);

  /**
   * Toggle the selection of completed request
   */
  const selectDocument = useCallback(
    async (item: DocumentType) => {
      if (item.isUploading) {
        return;
      }

      dispatch(toggleCompleteSelection(item));
    },
    [dispatch],
  );

  /**
   * Toggle select all completed requests
   */
  const selectAllDocument = useCallback(() => {
    dispatch(toggleAllCompleteSelection(!isAllSelected));
  }, [dispatch, isAllSelected]);

  return {
    completedDocuments,
    selectedCount,
    isAllSelected,
    clearAllDoc,
    selectDocument,
    selectAllDocument,
  };
};
