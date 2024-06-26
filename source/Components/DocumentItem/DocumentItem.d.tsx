import {DocumentType} from '../../Redux/Reducers/PendingDocumentReducer';

export interface DocumentUpload {
  item: DocumentType;
  type: 'Pending' | 'Error' | 'Completed';
  onPressUpload?: (item: DocumentType) => void;
  onPressCancel?: (item: DocumentType) => void;
  onPressSelect: (item: DocumentType) => void;
}
