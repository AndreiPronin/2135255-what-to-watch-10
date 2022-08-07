import {Middleware} from '@reduxjs/toolkit';
import browserHistory from '../../history';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<unknown, Reducer> = (store) => (next) => (action) => {
  if (action.type === 'user/redirect') {
    browserHistory.push(action.payload);
  }
  return next(action);
};
