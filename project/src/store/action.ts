import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../enums/route-enum';
import { IComment, IFilm } from '../types/type-films/Type-Films';


export const changeGenre = createAction('genre/changeGenre', (genre: string) => ({
  payload: genre,
}));
export const showMoreFilms = createAction('genre/showMoreFilms');
export const isLoad = createAction<boolean>('data/loadFilm');
export const loadPromo = createAction<IFilm>('data/loadPromo');
export const loadAllFilms = createAction<IFilm[]>('data/loadAllFilms');
export const loadAllComment = createAction<IComment[]>('data/loadAllComment');
export const redirectRoute = createAction<string>('user/redirect');
//export const getFilm = createAction<IFilm>('user/getFilm');
export const authorization = createAction<AuthorizationStatus>('user/authorization');
