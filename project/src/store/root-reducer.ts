import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../enums/enum';
import { dataFilms } from './film-process/film-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataFilms.reducer,
});
