import {useDispatch, useSelector} from 'react-redux';
import {IStoreState, store} from '../../Redux/Store/ReduxConfigStore';
import {useCallback, useEffect, useRef} from 'react';
import {NetInfo} from '../../Services/NetInfoService';
import {Alert, Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {pick, types} from 'react-native-document-picker';
import {
  DocumentType,
  clearAllDocuments,
  setUploadingDocument,
  toggleAllSelection,
  toggleSelection,
} from '../../Redux/Reducers/PendingDocumentReducer';
import {EventRegisterKeys, getGuid} from '../../Utils/Utils';
import {saveDocuments} from '../../Redux/Reducers/PendingDocumentReducer';
import {EventRegister} from 'react-native-event-listeners';
import Upload from 'react-native-background-upload';
import {
  clearErrorDocuments,
  saveErrorDocuments,
} from '../../Redux/Reducers/ErrorDocumentReducer';
import {saveCompletedDocuments} from '../../Redux/Reducers/CompletedDocumentReducer';
import {useSelectedCountHook} from '../../Hooks/SelectedCountHook';
import {getApiBaseUrl} from '../../AppConfig/AppConfigRoot';

export const usePendingScreen = () => {
  const counterRef = useRef<Array<any>>([]);
  const intervalRef = useRef<any>(null);
  const listener: any = useRef();
  const dispatch = useDispatch();

  const pendingDocuments = useSelector(
    (state: IStoreState) => state.PendingDocumentReducer,
  );

  const {selectedCount, totalCount, isAllSelected} =
    useSelectedCountHook(pendingDocuments);

  const errorDocuments = useSelector(
    (state: IStoreState) => state.ErrorDocumentReducer,
  );

  /**
   * Check permission for notification
   */
  const checkNotificationPermission = useCallback(async () => {
    let isPermissionGranted = false;
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version < 33) {
          isPermissionGranted = true;
        } else {
          isPermissionGranted = await PermissionsAndroid.check(
            'android.permission.POST_NOTIFICATIONS',
          );
        }
      }
    } catch (error) {
    } finally {
      return isPermissionGranted;
    }
  }, []);

  /**
   * Request permission for notification
   */
  const requestNotificationPermission = useCallback(async () => {
    let isPermissionGranted = false;
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        isPermissionGranted = await checkNotificationPermission();
        if (isPermissionGranted) {
          return isPermissionGranted;
        }

        const granted = await PermissionsAndroid.request(
          'android.permission.POST_NOTIFICATIONS',
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          isPermissionGranted = true;
        }
      } else {
        isPermissionGranted = true;
      }
    } catch (error) {
    } finally {
      return isPermissionGranted;
    }
  }, [checkNotificationPermission]);

  /**
   * Open picker to select documents of specific types
   * add selected documents to the pending list to upload
   */
  const onPickFiles = useCallback(async () => {
    try {
      const DocumentPickerTypes = [types.images, types.pdf];
      const options: any = {
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: DocumentPickerTypes,
        allowMultiSelection: true,
      };

      const response: any = await pick(options);

      let selectedItems: DocumentType[] = [];
      let counterItems: any[] = [];
      response.forEach((item: any) => {
        let updateItem = {
          ...item,
          isUploaded: false,
          isUploading: false,
          guid: getGuid(),
        };
        selectedItems.push(updateItem);
        counterItems.push({
          guid: updateItem.guid,
          count: 0,
        });
      });

      counterRef.current = counterItems;
      dispatch(saveDocuments(selectedItems));
    } catch (error) {}
  }, [dispatch]);

  /**
   * Change status from pending to uploaded
   */

  const uploadedDocument = useCallback(
    (item: any) => {
      dispatch(setUploadingDocument({type: 'Uploaded', guid: item.guid}));
      dispatch(saveCompletedDocuments([item]));
      dispatch(setUploadingDocument({type: 'Remove', guid: item.guid}));
    },
    [dispatch],
  );

  /**
   * Upload the document to server with the help of react-native-background-upload
   * If facing any error while uploading then the request goes from PendingScreen(PendingDocumentReducer) to ErrorScreen(ErrorDocumentReducer)
   * On uploading completed the request goes from PendingScreen(PendingDocumentReducer) to CompletedScreen(CompletedDocumentReducer)
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

      await requestNotificationPermission();
      let options: any = {
        url: `${getApiBaseUrl()}uploadFiles/uploadFile`,
        path: item.uri,
        method: 'POST',
        field: 'file',
        type: 'multipart',
        headers: {
          'content-type': 'application/octet-stream', // Customize content-type
          'my-custom-header': 's3headervalueorwhateveryouneed',
        },
        notification: {
          enabled: true,
          onProgressTitle: 'Uploading...',
          autoClear: true,
        },
      };

      Upload.startUpload(options)
        .then(uploadId => {
          dispatch(
            setUploadingDocument({
              type: 'Uploading',
              guid: item.guid,
              uploadID: uploadId,
            }),
          );

          Upload.addListener('progress', uploadId, data => {
            EventRegister.emit(EventRegisterKeys.documentUpload, {
              count: data.progress,
              guid: item.guid,
            });
            if (data.progress === 100) {
              uploadedDocument(item);
            }
          });
          Upload.addListener('error', uploadId, data => {
            if (!data || data.error !== 'User cancelled upload') {
              dispatch(saveErrorDocuments({item, type: 'Add'}));
              dispatch(setUploadingDocument({type: 'Remove', guid: item.guid}));
            }
          });
          Upload.addListener('cancelled', uploadId, () => {});
          Upload.addListener('completed', uploadId, () => {
            // data includes responseCode: number, responseBody: Object, responseHeaders: Lower cased http headers
          });
        })
        .catch(() => {
          dispatch(saveErrorDocuments({item, type: 'Add'}));
          dispatch(setUploadingDocument({type: 'Remove', guid: item.guid}));
        });
    },
    [requestNotificationPermission, uploadedDocument, dispatch],
  );

  /**
   * Upload the selected documents to server
   */
  const uploadAllDoc = useCallback(() => {
    if (!NetInfo.isNetworkConnected()) {
      Alert.alert('Info', 'No internet connection');
      return;
    }

    let documents = store.getState().PendingDocumentReducer;
    documents.forEach(item => {
      if (item.isSelected) {
        uploadDocument(item, 'Active');
      }
    });
  }, [uploadDocument]);

  /**
   * Cancel uploading request
   * Reset the uploading count to 0 with the help of event listener
   */
  const cancelDocument = useCallback(
    async (item: DocumentType) => {
      if (!item.uploadID) {
        return;
      }

      try {
        const response = await Upload.cancelUpload(item.uploadID);

        if (typeof response === 'boolean') {
          dispatch(setUploadingDocument({type: 'Cancel', guid: item.guid}));
          EventRegister.emit(EventRegisterKeys.documentUpload, {
            count: 0,
            guid: item.guid,
          });
        }
      } catch (error) {}
    },
    [dispatch],
  );

  /**
   * Remove the selected pending request from PendingDocumentReducer
   */
  const clearAllDoc = useCallback(() => {
    Alert.alert('Delete?', 'Are you sure you want to delete selected items?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(clearAllDocuments());
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

      dispatch(toggleSelection(item));
    },
    [dispatch],
  );

  /**
   * Toggle select all pending requests
   */
  const selectAllDocument = useCallback(async () => {
    dispatch(toggleAllSelection(!isAllSelected));
  }, [isAllSelected, dispatch]);

  /**
   * Add listener for reupload the pending request from the ErrorScreen(ErrorDocumentReducer)
   */
  useEffect(() => {
    listener.current = EventRegister.addEventListener(
      EventRegisterKeys.documentSendToPending,
      value => {
        uploadDocument(value.item, 'Active');
      },
    );

    return () => {
      if (listener.current != null) {
        EventRegister.removeEventListener(listener.current);
      }
    };
  }, [uploadDocument]);

  return {
    pendingDocuments,
    errorDocuments,
    selectedCount,
    totalCount,
    isAllSelected,
    uploadDocument,
    cancelDocument,
    selectDocument,
    onPickFiles,
    uploadAllDoc,
    clearAllDoc,
    selectAllDocument,
  };
};
