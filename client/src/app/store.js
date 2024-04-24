import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import compressSlice from './compressSlice.js';

export const store = configureStore({
    reducer: {
        compress: compressSlice,
    },
});

setupListeners(store.dispatch);

