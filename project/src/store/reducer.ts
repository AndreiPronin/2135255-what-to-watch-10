import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, showMoreFilms, loadPromo, loadAllFilms, isLoad, loadAllComment,authorization } from './action';
import { INITIAL_GENRE, INITIAL_FILM_CARDS_NUMBER, INCREMENT_FILM_CARDS_NUMBER } from './const';
import { IComment, IFilm } from '../types/type-films/Type-Films';
import { AuthorizationStatus } from '../enums/route-enum';

//const ALL_GENRE = Array.from(new Set(FILMS.map((item) => item.genre))).map((item) => item);
const FILMS:IFilm[] = [];

const initialState = {
  allGenre: [] as string[],
  activeGenre: INITIAL_GENRE,
  filmListAll: FILMS,
  filmsList: FILMS,
  comment:{} as IComment[],
  quantityFilms:0,
  authorizationStatus: AuthorizationStatus.Unknown,
  activeFilmsCardsNumber: INITIAL_FILM_CARDS_NUMBER,
  promo:{} as IFilm,
  error:'',
  isLoad: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, { payload }) => {
      state.activeFilmsCardsNumber = INITIAL_FILM_CARDS_NUMBER;
      state.activeGenre = payload;
      const filteredList =
        payload === INITIAL_GENRE
          ? state.filmListAll
          : state.filmListAll.filter(({ genre }) => genre === payload);
      state.quantityFilms = filteredList.length;
      state.filmsList = filteredList.slice(0, state.activeFilmsCardsNumber);
    })
    .addCase(showMoreFilms, (state) => {
      state.activeFilmsCardsNumber += INCREMENT_FILM_CARDS_NUMBER;
      const filteredList =
      state.activeGenre === INITIAL_GENRE
        ? state.filmListAll
        : state.filmListAll.filter(({ genre }) => genre === state.activeGenre);
      state.quantityFilms = filteredList.length;
      state.filmsList = filteredList.slice(0, state.activeFilmsCardsNumber);
    })
    .addCase(loadPromo, (state, { payload }) => {
      state.promo = payload ;
    })
    .addCase(isLoad, (state, { payload }) => {
      state.isLoad = payload ;
    })
    .addCase(authorization, (state, { payload }) => {
      state.authorizationStatus = payload ;
    })
    .addCase(loadAllComment, (state, { payload }) => {
      state.comment = payload ;
    })
    .addCase(loadAllFilms, (state, { payload }) => {
      state.quantityFilms = payload.length;
      state.filmListAll = payload;
      state.filmsList = payload.slice(0,INITIAL_FILM_CARDS_NUMBER);
      state.allGenre = Array.from(new Set(payload.map((item) => item.genre))).map((item) => item);
    });
});

export { reducer };
