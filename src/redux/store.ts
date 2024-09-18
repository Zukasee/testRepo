import { configureStore } from '@reduxjs/toolkit';
import { competitionsApi, matchesApi } from '../shared/api';

export const store = configureStore({
    reducer: {
        [competitionsApi.reducerPath]: competitionsApi.reducer,
        [matchesApi.reducerPath]: matchesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(competitionsApi.middleware)
            .concat(matchesApi.middleware),
});
