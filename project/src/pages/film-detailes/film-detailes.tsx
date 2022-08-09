import { Link, useParams } from 'react-router-dom';
import AddMyList from '../../components/add-my-list/add-my-list';
import FilmFooter from '../../components/film-footer/film-footer';
import MenuFilm from '../../components/menu-film/menu-film';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';
import { useAppSelector } from '../../hooks';
import { useGetFilmsProperty } from '../../hooks/load-films';
import { getAllFilms } from '../../store/film-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selector';


function Detailes():JSX.Element{
  const {id} = useParams();
  useGetFilmsProperty(id as string);
  const filmListAll = useAppSelector(getAllFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = filmListAll.find((item)=> (item.id === Number(id)));
  console.log(film?.starring)
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
                <Link to={AppRoute.Login} className="user-block__link">{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</Link>
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
                  <span> <Link to={`${AppRoute.Player}${film.id}`}>Play</Link></span>
                </button>
                <AddMyList film={film} />
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
              <div className="film-card__text film-card__row">
                <div className="film-card__text-col">
                  <p className="film-card__details-item">
                    <strong className="film-card__details-name">{film.director}</strong>
                    <span className="film-card__details-value">Wes Anderson</span>
                  </p>
                  <p className="film-card__details-item">
                    <strong className="film-card__details-name">Starring</strong>
                    <span className="film-card__details-value">
                      {film.starring.join(', <br />')}
                    </span>
                  </p>
                </div>
                <div className="film-card__text-col">
                  <p className="film-card__details-item">
                    <strong className="film-card__details-name">Run Time</strong>
                    <span className="film-card__details-value">{String(film.runTime / 60).split('.')[0]} h {String(film.runTime / 60).split('.')[1].substring(0,2)} minute</span>
                  </p>
                  <p className="film-card__details-item">
                    <strong className="film-card__details-name">Genre</strong>
                    <span className="film-card__details-value">{film.genre}</span>
                  </p>
                  <p className="film-card__details-item">
                    <strong className="film-card__details-name">Released</strong>
                    <span className="film-card__details-value">{film.released}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
      {<FilmFooter typeFilms={film} films={filmListAll} />}
    </>
  );
}
export default Detailes;
