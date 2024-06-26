import {combineReducers} from '@reduxjs/toolkit';
import ErrorDocumentReducer from './ErrorDocumentReducer';
import PendingDocumentReducer from './PendingDocumentReducer';
import CompletedDocumentReducer from './CompletedDocumentReducer';

const combinedReducer = combineReducers({
  ErrorDocumentReducer,
  PendingDocumentReducer,
  CompletedDocumentReducer,
});

export const RootReducer = (state: any, action: any) => {
  if (action.type === '#RESET') {
    const {
      ErrorDocumentReducer: _ErrorDocumentReducer,
      PendingDocumentReducer: _PendingDocumentReducer,
      CompletedDocumentReducer: _CompletedDocumentReducer,
    } = state;
    state = {
      ErrorDocumentReducer: _ErrorDocumentReducer,
      PendingDocumentReducer: _PendingDocumentReducer,
      CompletedDocumentReducer: _CompletedDocumentReducer,
    };
  }
  return combinedReducer(state, action);
};
