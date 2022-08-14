import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';
import { useAppSelector } from '../../hooks';
import { IPropsFilm } from '../../types/type-films/Type-Films';
import Promo from '../promo/promo';

function Header(props:IPropsFilm):JSX.Element{
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  return(
    <section className="film-card">
      <div className="film-card__bg">
        <img src={props.film.backgroundImage} alt="The Grand Budapest Hotel" />
      </div>
      <h1 className="visually-hidden">{props.film.name}</h1>
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
      <Promo film={props.film} />
    </section>
  );
}
export default Header;
