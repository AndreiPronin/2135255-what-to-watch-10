import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import {reducer} from './reducer';
import { redirect } from './middleware/redirect';


export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }).concat(redirect),
});
