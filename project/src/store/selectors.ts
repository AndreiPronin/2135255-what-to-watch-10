import { createSelector } from 'reselect';
import { IFilm } from '../types/type-films/Type-Films';

export interface IPropsFilms{
  filmsList:IFilm[]
}

//export const getFilmsList = (state: IPropsFilms) => { return state.filmsList; };

//export const getQuantityFilms = createSelector(
//  getFilmsList,
// (films) => {
//    return films.length;
//  }
//);
