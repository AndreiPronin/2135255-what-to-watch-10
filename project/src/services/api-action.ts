import {createAsyncThunk} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../enums/enum';
import { AppDispatch, State } from '../types/state';
import { AddFavoriteFilm, IComment, IFilm, SaveModelComment } from '../types/type-films/Type-Films';
import { UserData, User } from '../types/auth-data';
import { dropToken, saveToken } from './token';
import { redirectRoute } from '../store/action';
import { setError } from '../store/film-process/film-process';
import { ERROR_SUBMIT_FORM } from '../store/const';

export const getPromoFilmAction = createAsyncThunk<IFilm, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GetPromoFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<IFilm>(APIRoute.Promo);
    return data;
  },
);

export const getAllFilmAction = createAsyncThunk<IFilm[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GetAllFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<IFilm[]>(APIRoute.Films);
    return data;
  },
);

export const getAllComment = createAsyncThunk<IComment[], string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GetAllComment',
  async (ID:string,{dispatch, extra: api}) => {
    const {data} = await api.get<IComment[]>(`${APIRoute.Comments}/${ID}`);
    return data;
  },
);

export const SaveComment = createAsyncThunk<void, SaveModelComment, {
  dispatch:AppDispatch,
  extra: AxiosInstance
}>(
  'data/SaveComment',
  async ({idFilms,comment,rating} : SaveModelComment,{dispatch, extra: api}) => {
    try{
      await api.post(`${APIRoute.Comments}/${idFilms}`,{comment,rating} );
      dispatch(redirectRoute(`${AppRoute.Film}${idFilms}/review`));
    }catch{
      dispatch(setError(ERROR_SUBMIT_FORM));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const getFilm = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/getFilm',
  async (id, {dispatch, extra: api}) => {
    await api.get<IFilm>(`${APIRoute.Films}/${id}`);
  },
);

export const loginAction = createAsyncThunk<void, UserData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectRoute(AppRoute.Main));
  },
);

export const AddFavoriteFilmAction = createAsyncThunk<void, AddFavoriteFilm, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/AddFavoriteFilmAction',
  async ({filmId,status} : AddFavoriteFilm, {dispatch, extra: api}) => {
    try{
      await api.post(`${APIRoute.Favorite}/${filmId}/${status}`);
      window.location.reload();
    }catch{
      dispatch(redirectRoute(AppRoute.Login));
    }
  },
);
export const GetFavoriteFilmAction = createAsyncThunk<IFilm[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GetFavoriteFilmAction',
  async (_arg,{extra: api}) => {
    const {data} = await api.get(`${APIRoute.Favorite}`);
    return data;
  },
);

