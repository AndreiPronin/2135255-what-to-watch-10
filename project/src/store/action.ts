import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction('genre/changeGenre', (genre: string) => ({
  payload: genre,
}));
export const showMoreFilms = createAction('genre/showMoreFilms');
export const resetFilmsList = createAction('genre/resetFilmsList');
