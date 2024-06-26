import {configureStore} from '@reduxjs/toolkit';
import {ReduxPersistStorage} from '../../Services/MMKVStorageService';
import {RootReducer} from '../Reducers/ReducersRoot';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

/**
 * Whitelist reducers will stored into storage
 * Retreive data to reducers once app get open
 */
const whitelist = [
  'PendingDocumentReducer',
  'ErrorDocumentReducer',
  'CompletedDocumentReducer',
];

// persist configs
const persistConfig = {
  key: 'root',
  version: 1,
  whitelist,
  storage: ReduxPersistStorage,
  debug: __DEV__,
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, RootReducer);

// middleware
const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

// setup store
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

// persist store
export const persistor = persistStore(store);

// store state interface
export type IStoreState = ReturnType<typeof store.getState>;
