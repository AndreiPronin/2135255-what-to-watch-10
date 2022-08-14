import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmSimilar } from '../../services/api-action';
import { getSimilarFilm } from '../../store/film-process/selectors';
import { IFilm } from '../../types/type-films/Type-Films';
import FilmList from '../film-list/film-list';
interface IFilmsFooter{
  typeFilms:IFilm | null | undefined,
}

function FilmFooter(props:IFilmsFooter):JSX.Element{
  const dispatch = useAppDispatch();
  useEffect(()=>()=>{
    dispatch(getFilmSimilar(String(props.typeFilms?.id)));
  },[dispatch,props.typeFilms?.id]);
  const ArrayShowMore = useAppSelector(getSimilarFilm).slice(0,4);
  return(
    <div className="page-content">
      {ArrayShowMore.length > 0 &&
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        {
          <FilmList films={ArrayShowMore} />
        }
      </section>}
      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
export default FilmFooter;
