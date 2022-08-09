import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AddFavoriteFilmAction,GetFavoriteFilmAction } from '../../services/api-action';
import { IPropsFilm } from '../../types/type-films/Type-Films';
import { getFavoreteFilms } from '../../store/film-process/selectors';
import { AddFavoriteFilm } from '../../types/type-films/Type-Films';
import { AddfavoriteFilmStatus } from '../../enums/enum';
import { useEffect } from 'react';

function AddMyList(props:IPropsFilm){
  const dispatch = useAppDispatch();
  useEffect(()=>()=>{
    dispatch(GetFavoriteFilmAction());
  },[dispatch]);
  const favoriteFilm = useAppSelector(getFavoreteFilms);
  const film = favoriteFilm.find((item)=> item.id === props.film.id);
  const AddFilm = (Film: AddFavoriteFilm) => {
    dispatch(AddFavoriteFilmAction(Film));
  };
  return(
    <button className="btn btn--list film-card__button" type="button">
      {film === undefined &&
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use onClick={()=>AddFilm({
          filmId: props.film.id,
          status: AddfavoriteFilmStatus.Add})} xlinkHref="#add"
        >
        </use>
      </svg>}
      {film !== undefined &&
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use onClick={()=>AddFilm({
          filmId: props.film.id,
          status: AddfavoriteFilmStatus.Delete})} xlinkHref="#in-list"
        >
        </use>
      </svg>}
      <span><Link to={AppRoute.MyList} className="user-block__link">My list</Link></span>
      <span className="film-card__count">{favoriteFilm.length}</span>
    </button>
  );
}
export default AddMyList;
