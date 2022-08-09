import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmCard from '../../components/film-card/film-card';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useMouseHover } from '../../hooks/mouse-hover';
import { GetFavoriteFilmAction } from '../../services/api-action';
import { getFavoreteFilms } from '../../store/film-process/selectors';


function MyList():JSX.Element{
  const {MouseOver,MouseOut,activVideo} = useMouseHover();
  const dispatch = useAppDispatch();
  useEffect(()=>()=>{
    dispatch(GetFavoriteFilmAction());
  },[dispatch]);
  const filmListAll = useAppSelector(getFavoreteFilms);
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{filmListAll.length}</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.Login} className="user-block__link">{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</Link>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {filmListAll.length === 0 &&
          <p className="small-film-card__title">вапр</p>}
          {
            filmListAll.map((film)=>
              <FilmCard key={film.id} film={film} isActiveVideo={Number(activVideo) === film.id} mouseOver={MouseOver} mouseOut={MouseOut} />
            )
          }
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
export default MyList;
