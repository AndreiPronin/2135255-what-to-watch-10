import { Link, Outlet, useParams } from 'react-router-dom';
import AddMyList from '../../components/add-my-list/add-my-list';
import FilmFooter from '../../components/film-footer/film-footer';
import MenuFilm from '../../components/menu-film/menu-film';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';
import { useAppSelector } from '../../hooks';
import { useGetFilmsProperty } from '../../hooks/load-films';
import { getCurrentFilm } from '../../store/film-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selector';

function Film():JSX.Element{
  const {id} = useParams();
  useGetFilmsProperty(id as string);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = useAppSelector(getCurrentFilm);
  return(
    <div>
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
                  { (authorizationStatus === AuthorizationStatus.Auth ) &&
                    <Link to={`${AppRoute.MyList}`} ><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>}
                  { (authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) &&
                    <Link to={`${AppRoute.Login}`} ><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>}
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
                  <span><Link style={{textDecoration:'none',color:'#eee5b5'}} to={`${AppRoute.Player}${film.id}`}>Play</Link></span>
                </button>
                <AddMyList film={film} />
                { (authorizationStatus === AuthorizationStatus.Auth) &&
                <Link to={`${AppRoute.AddReview}${film.id}`} className="btn film-card__button">Add review</Link>}
                { (authorizationStatus === AuthorizationStatus.Unknown || authorizationStatus === AuthorizationStatus.NoAuth) &&
                <Link to={`${AppRoute.Login}`} className="btn film-card__button">Add review</Link>}
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
              <Outlet />
            </div>
          </div>
        </div>
        {film.id !== undefined &&
        <FilmFooter typeFilms={film} />}
      </section>}
    </div>
  );
}
export default Film;
