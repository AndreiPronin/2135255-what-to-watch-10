import { AuthorizationStatus } from '../enums/enum';
import { store } from '../store';
import { IComment, IFilm } from './type-films/Type-Films';


export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}
export type dataFilm = {
  allGenre: string[] ;
  activeGenre: string;
  favoriteFilms:IFilm[];
  filmListAll: IFilm[];
  comment:IComment[];
  activeFilmsCardsNumber: number;
  promo:IFilm;
  error: string;
  isLoad: boolean;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
