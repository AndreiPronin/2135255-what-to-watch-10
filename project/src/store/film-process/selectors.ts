import { State } from '../../types/state';
import { NameSpace } from '../../enums/enum';
import { IComment, IFilm } from '../../types/type-films/Type-Films';
import { createSelector } from '@reduxjs/toolkit';
import { INITIAL_GENRE } from '../const';

export const getAllGenre = (state: State): string[] => state[NameSpace.Data].allGenre;
export const getActiveGenre = (state: State): string => state[NameSpace.Data].activeGenre;
export const getAllFilms = (state: State): IFilm[] => state[NameSpace.Data].filmListAll;
export const getAllComment = (state: State): IComment[] => state[NameSpace.Data].comment;
export const getActiveFilmsCardsNumber = (state: State): number => state[NameSpace.Data].activeFilmsCardsNumber;
export const getPromoFilm = (state: State): IFilm => state[NameSpace.Data].promo;
export const getFavoreteFilms = (state: State): IFilm[] => state[NameSpace.Data].favoriteFilms;
export const getLoad = (state:State): boolean => state[NameSpace.Data].isLoad;

export const filterFilms = createSelector(
  [getAllFilms,getActiveGenre,getActiveFilmsCardsNumber],
  (filmListAll,activGenre,activCardNumber) =>{
    if(activGenre === INITIAL_GENRE){
      return filmListAll.slice(0,activCardNumber);
    }else{
      return filmListAll.filter(({ genre }) => genre === activGenre);
    }
  }
);

export const getQuantityFilms = createSelector(
  [getAllFilms,getActiveGenre],
  (filmListAll,activGenre) => {
    if(activGenre === INITIAL_GENRE){
      return filmListAll.length;
    }else{
      return filmListAll.filter(({ genre }) => genre === activGenre).length;
    }
  }
);

