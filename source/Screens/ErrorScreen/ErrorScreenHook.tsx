import {useDispatch, useSelector} from 'react-redux';
import {IStoreState, store} from '../../Redux/Store/ReduxConfigStore';
import {useCallback, useRef} from 'react';
import {NetInfo} from '../../Services/NetInfoService';
import {
  DocumentType,
  saveDocuments,
} from '../../Redux/Reducers/PendingDocumentReducer';
import {
  clearErrorDocuments,
  saveErrorDocuments,
  toggleErrorSelection,
  toggleAllErrorSelection,
} from '../../Redux/Reducers/ErrorDocumentReducer';
import {EventRegister} from 'react-native-event-listeners';
import {Alert} from 'react-native';
import {useSelectedCountHook} from '../../Hooks/SelectedCountHook';
import {EventRegisterKeys} from '../../Utils/Utils';

export const useErrorScreen = () => {
  const counterRef = useRef<Array<any>>([]);
  const intervalRef = useRef<any>(null);

  const dispatch = useDispatch();
  const errorDocuments = useSelector(
    (state: IStoreState) => state.ErrorDocumentReducer,
  );
  const {selectedCount, isAllSelected} = useSelectedCountHook(errorDocuments);

  /**
   * Upload the document to server with the help of react-native-background-upload
   * If facing any error while uploading then the request goes from ErrorScreen(ErrorDocumentReducer) to PendingScreen(PendingDocumentReducer)
   */
  const uploadDocument = useCallback(
    async (item: any, type: string) => {
      if (!NetInfo.isNetworkConnected()) {
        Alert.alert('Info', 'No internet connection');
        return;
      }

      if (type === 'Pending') {
        dispatch(saveErrorDocuments({item, type: 'Remove'}));
        dispatch(saveDocuments([item]));
      }

      EventRegister.emit(EventRegisterKeys.documentSendToPending, {
        item: item,
        type: type,
      });
    },
    [dispatch],
  );

  /**
   * Upload the selected documents to server
   */
  const uploadAllDoc = useCallback(() => {
    if (!NetInfo.isNetworkConnected()) {
      Alert.alert('Info', 'No internet connection');
      return;
    }

    let documents = store.getState().ErrorDocumentReducer;

    documents.forEach(item => {
      if (item.isSelected) {
        uploadDocument(item, 'Pending');
      }
    });
  }, [uploadDocument]);

  /**
   * Remove the selected pending request from ErrorDocumentReducer
   */
  const clearAllDoc = useCallback(() => {
    Alert.alert('Delete?', 'Are you sure you want to delete selected items?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(clearErrorDocuments());
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            counterRef.current = [];
          }
        },
      },
    ]);
  }, [dispatch]);

  /**
   * Toggle the selection of pending request
   */
  const selectDocument = useCallback(
    async (item: DocumentType) => {
      if (item.isUploading) {
        return;
      }

      dispatch(toggleErrorSelection(item));
    },
    [dispatch],
  );

  /**
   * Toggle select all pending requests
   */
  const selectAllDocument = useCallback(async () => {
    dispatch(toggleAllErrorSelection(!isAllSelected));
  }, [dispatch, isAllSelected]);

  return {
    errorDocuments,
    isAllSelected,
    selectedCount,
    uploadDocument,
    clearAllDoc,
    uploadAllDoc,
    selectDocument,
    selectAllDocument,
  };
};
