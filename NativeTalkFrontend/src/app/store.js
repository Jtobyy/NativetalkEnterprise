import { configureStore } from '@reduxjs/toolkit';
import usersAmountReducer from '../features/usersAmountSlice';
import didsReducer from '../features/didsSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUsersAmountReducer = persistReducer(persistConfig, usersAmountReducer)
// const persistedDidsReducer = persistReducer(persistConfig, didsReducer)

export const store = configureStore({
  reducer: {
    usersAmount: persistedUsersAmountReducer,
    dids: didsReducer,
  },
});

export const persistor = persistStore(store)