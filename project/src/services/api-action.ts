import {createAsyncThunk} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../enums/route-enum';
import { authorization, isLoad, loadAllComment, loadAllFilms, loadPromo, redirectRoute } from '../store/action';
import { AppDispatch, State } from '../types/state';
import { IComment, IFilm, SaveModelComment } from '../types/type-films/Type-Films';
import { UserData, User } from '../types/auth-data';
import { dropToken, saveToken } from './token';

export const getPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GetPromoFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(isLoad(true));
    const {data} = await api.get<IFilm>(APIRoute.Promo);
    dispatch(loadPromo(data));
    dispatch(isLoad(false));
  },
);

export const getAllFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GetAllFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(isLoad(true));
    const {data} = await api.get<IFilm[]>(APIRoute.Films);
    dispatch(loadAllFilms(data));
    dispatch(isLoad(false));
  },
);

export const getAllComment = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GetAllComment',
  async (ID:string,{dispatch, extra: api}) => {
    const {data} = await api.get<IComment[]>(`${APIRoute.Comments}/${ID}` );
    dispatch(loadAllComment(data));
  },
);

export const SaveComment = createAsyncThunk<void, SaveModelComment, {
  dispatch:AppDispatch,
  extra: AxiosInstance
}>(
  'data/SaveComment',
  async ({idFilms,comment,rating} : SaveModelComment,{dispatch, extra: api}) => {
    await api.post(`${APIRoute.Comments}/${idFilms}`,{comment,rating} );
    dispatch(redirectRoute(`${AppRoute.Film}${idFilms}/review`));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(authorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(authorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const getFilm = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/getFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      await api.get<IFilm>(`${APIRoute.Films}/${id}`);
    } catch {
      dispatch(redirectRoute(AppRoute.NotFound));
    }
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
    dispatch(authorization(AuthorizationStatus.Auth));
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
    dispatch(authorization(AuthorizationStatus.NoAuth));
    dispatch(redirectRoute(AppRoute.Main));
  },
);

