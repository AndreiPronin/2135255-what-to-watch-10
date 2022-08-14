import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { getAllComment, getFilm } from '../services/api-action';

export const useGetFilmsProperty = (id:string) =>{
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(getFilm(id));
    dispatch(getAllComment(id));
  },[dispatch,id]);
  return {dispatch};
};
