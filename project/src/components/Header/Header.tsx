import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/route-enum';
import { IPropsFilm } from '../../types/type-films/Type-Films';
import Promo from '../promo/promo';

function Header(props:IPropsFilm):JSX.Element{

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
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.Login} className="user-block__link">Sign out</Link>
          </li>
        </ul>
      </header>
      <Promo film={props.film} />
    </section>
  );
}
export default Header;
