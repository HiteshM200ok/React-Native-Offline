import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DocumentPickerResponse} from 'react-native-document-picker';

export type DocumentType = DocumentPickerResponse & {
  guid: string;
  isUploading: boolean;
  isUploaded: boolean;
  uploadID: string | null;
  isSelected: boolean;
};

// Reducer identity & initial state
const identity = 'PendingDocumentReducer';
const initialState: DocumentType[] = [];

const PendingDocumentSlice = createSlice({
  name: identity,
  initialState: initialState,
  reducers: {
    saveDocuments: (
      state: DocumentType[],
      action: PayloadAction<Array<DocumentType>>,
    ) => {
      return [...state, ...action.payload];
    },
    clearAllDocuments: (state: DocumentType[]) => {
      return state.filter(item => !item.isSelected || item.isUploading);
    },
    setUploadingDocument: (
      state: DocumentType[],
      action: PayloadAction<{
        type: 'Uploading' | 'Cancel' | 'Uploaded' | 'Remove';
        guid: string;
        uploadID?: string | null;
      }>,
    ) => {
      if (action.payload.type === 'Remove') {
        return state.filter(item => item.guid !== action.payload.guid);
      } else {
        const index = state.findIndex(
          item => item.guid === action.payload.guid,
        );
        if (index >= 0) {
          state[index].isUploading =
            action.payload.type === 'Uploading' ? true : false;
          if (action.payload.uploadID) {
            state[index].uploadID = action.payload.uploadID;
          }
          if (action.payload.type === 'Uploaded') {
            state[index].isUploaded = true;
            state[index].uploadID = null;
          }
        }
      }
    },
    toggleSelection: (
      state: DocumentType[],
      action: PayloadAction<DocumentType>,
    ) => {
      const index = state.findIndex(item => item.guid === action.payload.guid);
      if (index > -1) {
        state[index].isSelected = !state[index].isSelected;
      }
    },
    toggleAllSelection: (
      state: DocumentType[],
      action: PayloadAction<boolean>,
    ) => {
      state.forEach(async item => {
        if (!item.isUploading) {
          item.isSelected = action.payload;
        }
      });
    },
  },
});

export const {
  saveDocuments,
  clearAllDocuments,
  setUploadingDocument,
  toggleSelection,
  toggleAllSelection,
} = PendingDocumentSlice.actions;
export default PendingDocumentSlice.reducer;
