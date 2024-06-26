import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DocumentType} from './PendingDocumentReducer';

// Reducer identity & initial state
const indentify = 'ErrorDocumentReducer';
const initialState: DocumentType[] = [];

const ErrorDocumentSlice = createSlice({
  name: indentify,
  initialState: initialState,
  reducers: {
    saveErrorDocuments: (
      state: DocumentType[],
      action: PayloadAction<{
        type: 'Add' | 'Remove';
        item: DocumentType;
      }>,
    ) => {
      if (action.payload.type === 'Remove') {
        return state.filter(item => item.guid !== action.payload.item.guid);
      } else {
        return [...state, {...action.payload.item, isSelected: false}];
      }
    },
    clearErrorDocuments: (state: DocumentType[]) => {
      return state.filter(item => !item.isSelected || item.isUploading);
    },
    toggleErrorSelection: (
      state: DocumentType[],
      action: PayloadAction<DocumentType>,
    ) => {
      const index = state.findIndex(item => item.guid === action.payload.guid);
      if (index > -1) {
        state[index].isSelected = !state[index].isSelected;
      }
    },
    toggleAllErrorSelection: (
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
  saveErrorDocuments,
  clearErrorDocuments,
  toggleErrorSelection,
  toggleAllErrorSelection,
} = ErrorDocumentSlice.actions;
export default ErrorDocumentSlice.reducer;
