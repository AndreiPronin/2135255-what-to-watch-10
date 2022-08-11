import { createSlice } from '@reduxjs/toolkit';
//import { changeGenre, showMoreFilms, loadPromo, loadAllFilms, isLoad, loadAllComment } from './action';
import { INITIAL_GENRE, INITIAL_FILM_CARDS_NUMBER, INCREMENT_FILM_CARDS_NUMBER } from '../const';
import { NameSpace } from '../../enums/enum';
import { IComment, IFilm } from '../../types/type-films/Type-Films';
import { dataFilm } from '../../types/state';
import { getAllFilmAction, getPromoFilmAction,getAllComment, GetFavoriteFilmAction, getFilm, getFilmSimilar } from '../../services/api-action';

const FILMS:IFilm[] = [];

const initialState : dataFilm = {
  allGenre: [] as string[],
  activeGenre: INITIAL_GENRE,
  filmListAll: FILMS,
  favoriteFilms:FILMS,
  similarFilm:FILMS,
  currentFilm:{} as IFilm,
  comment:{} as IComment[],
  activeFilmsCardsNumber: INITIAL_FILM_CARDS_NUMBER,
  promo:{} as IFilm,
  error:'',
  isLoad: false
};

export const dataFilms = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeGenre: (state,action)=>{
      state.activeFilmsCardsNumber = INITIAL_FILM_CARDS_NUMBER;
      state.activeGenre = action.payload;
    },
    setError: (state,action)=>{
      state.error = action.payload;
    },
    showMoreFilms: (state)=>{
      state.activeFilmsCardsNumber += INCREMENT_FILM_CARDS_NUMBER;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPromoFilmAction.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getPromoFilmAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isLoad = false;
      })
      .addCase(getAllFilmAction.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getAllFilmAction.fulfilled, (state, action) => {
        state.isLoad = false;
        state.filmListAll = action.payload;
        state.allGenre = Array.from(new Set(action.payload.map((item) => item.genre))).map((item) => item);
      })
      .addCase(getAllComment.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getAllComment.fulfilled, (state,action) => {
        state.isLoad = false;
        state.comment = action.payload;
      })
      .addCase(GetFavoriteFilmAction.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(GetFavoriteFilmAction.fulfilled, (state,action) => {
        state.isLoad = false;
        state.favoriteFilms = action.payload;
      })
      .addCase(getFilm.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getFilm.fulfilled, (state,action) => {
        state.isLoad = false;
        state.currentFilm = action.payload;
      })
      .addCase(getFilmSimilar.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getFilmSimilar.fulfilled, (state,action) => {
        state.isLoad = false;
        state.similarFilm = action.payload;
      });
  }
});

export const {changeGenre,showMoreFilms,setError} = dataFilms.actions;
