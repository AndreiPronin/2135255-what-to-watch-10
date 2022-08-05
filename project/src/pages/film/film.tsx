import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import FilmFooter from '../../components/film-footer/film-footer';
import MenuFilm from '../../components/menu-film/menu-film';
import { AppRoute, AuthorizationStatus } from '../../enums/route-enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllFilmAction, getFilm } from '../../services/api-action';

function Film():JSX.Element{
  const {id} = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(getFilm(id as string));
    dispatch(getAllFilmAction());
  },[dispatch,id]);
  const { filmListAll, authorizationStatus } = useAppSelector(
    (state) => state
  );
  const film = filmListAll.filter((item)=> (item.id === Number(id)))[0];
  return(
    <>
      {film !== undefined &&
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link to={AppRoute.Login} className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span><Link to={`${AppRoute.Player}${film.id}`}>Play</Link></span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span><Link to={AppRoute.MyList} className="user-block__link">My list</Link></span>
                  <span className="film-card__count">9</span>
                </button>
                { (authorizationStatus !== AuthorizationStatus.Unknown && authorizationStatus !== AuthorizationStatus.NoAuth) &&
                <Link to={`${AppRoute.AddReview}${film.id}`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <MenuFilm film={film} />
              <div className="film-rating">
                <div className="film-rating__score">{film.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">Very good</span>
                  <span className="film-rating__count">240 ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{film.description}</p>
                <p className="film-card__director"><strong>Director: {film.director}</strong></p>
                <p className="film-card__starring"><strong>Starring: {film.starring}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>}
      {<FilmFooter typeFilms={film} films={filmListAll} />}
    </>
  );
}
export default Film;
