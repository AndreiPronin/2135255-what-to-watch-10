import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { getAllComment, getAllFilmAction, getFilm } from '../services/api-action';

export const useGetFilmsProperty = (id:string) =>{
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(getFilm(id));
    dispatch(getAllFilmAction());
    dispatch(getAllComment(id));
  },[dispatch,id]);
  return {dispatch};
};
