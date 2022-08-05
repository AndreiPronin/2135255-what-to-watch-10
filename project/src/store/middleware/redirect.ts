import {Middleware} from '@reduxjs/toolkit';
import {reducer} from '../reducer';
import browserHistory from '../../history';

type Reducer = ReturnType<typeof reducer>

export const redirect: Middleware<unknown, Reducer> = (store) => (next) => (action) => {
  if (action.type === 'user/redirect') {
    browserHistory.push(action.payload);
  }
  return next(action);
};
