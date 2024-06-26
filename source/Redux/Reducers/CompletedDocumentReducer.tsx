import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DocumentType} from './PendingDocumentReducer';

// Reducer identity & initial state
const indentify = 'CompletedDocumentReducer';
const initialState: DocumentType[] = [];

const CompletedDocumentSlice = createSlice({
  name: indentify,
  initialState: initialState,
  reducers: {
    saveCompletedDocuments: (
      state: DocumentType[],
      action: PayloadAction<Array<DocumentType>>,
    ) => {
      return [...state, ...action.payload];
    },
    clearCompletedDocuments: (state: DocumentType[]) => {
      return state.filter(item => !item.isSelected || item.isUploading);
    },
    toggleCompleteSelection: (
      state: DocumentType[],
      action: PayloadAction<DocumentType>,
    ) => {
      const index = state.findIndex(item => item.guid === action.payload.guid);
      if (index > -1) {
        state[index].isSelected = !state[index].isSelected;
      }
    },
    toggleAllCompleteSelection: (
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
  saveCompletedDocuments,
  clearCompletedDocuments,
  toggleCompleteSelection,
  toggleAllCompleteSelection,
} = CompletedDocumentSlice.actions;
export default CompletedDocumentSlice.reducer;
