import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, showMoreFilms, resetFilmsList } from './action';
import { INITIAL_GENRE, INITIAL_FILM_CARDS_NUMBER, INCREMENT_FILM_CARDS_NUMBER } from './const';
import {FILMS} from '../Moq/Films-List';

const initialFilmsList = FILMS.slice(0, INITIAL_FILM_CARDS_NUMBER);

const ALL_GENRE = Array.from(new Set(FILMS.map((item) => item.genre))).map((item) => item);
const QUANTITY_FILMS = FILMS.length;

const initialState = {
  allGenre:ALL_GENRE,
  activeGenre: INITIAL_GENRE,
  filmsList: initialFilmsList,
  quantityFilms:QUANTITY_FILMS,
  activeFilmsCardsNumber: INITIAL_FILM_CARDS_NUMBER,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, { payload }) => {
      state.activeFilmsCardsNumber = INITIAL_FILM_CARDS_NUMBER;
      state.activeGenre = payload;
      const filteredList =
        payload === INITIAL_GENRE
          ? FILMS
          : FILMS.filter(({ genre }) => genre === payload);
      state.quantityFilms = filteredList.length;
      state.filmsList = filteredList.slice(0, state.activeFilmsCardsNumber);
    })
    .addCase(showMoreFilms, (state) => {
      state.activeFilmsCardsNumber += INCREMENT_FILM_CARDS_NUMBER;
      const filteredList =
      state.activeGenre === INITIAL_GENRE
        ? FILMS
        : FILMS.filter(({ genre }) => genre === state.activeGenre);
      state.filmsList = filteredList.slice(0, state.activeFilmsCardsNumber);
    })
    .addCase(resetFilmsList, (state) => {
      state.activeGenre = INITIAL_GENRE;
      state.filmsList = initialFilmsList;
      state.activeFilmsCardsNumber = INITIAL_FILM_CARDS_NUMBER;
    });
});

export { reducer };
