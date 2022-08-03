import { createSelector } from 'reselect';
import {State} from '../types/state';

export const getFilmsList = (state:State) => state.filmsList;

export const getQuantityFilms = createSelector(
  getFilmsList,
  (films) => films.length
);
