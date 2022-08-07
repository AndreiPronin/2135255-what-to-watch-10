import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../enums/enum';
import { IPropsFilm } from '../../types/type-films/Type-Films';

function MenuFilm(props:IPropsFilm):JSX.Element{
  const location = useLocation();
  const { pathname } = location;
  return(
    <nav className='film-nav film-card__nav'>
      <ul className='film-nav__list'>
        <li className={pathname === `${AppRoute.Film}${props.film.id}` ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} >
          <Link to={`${AppRoute.Film}${props.film.id}`} className='film-nav__link'>Overview</Link>
        </li>
        <li className={pathname === `${AppRoute.Film}${props.film.id}/details` ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} >
          <Link to={`${AppRoute.Film}${props.film.id}/details`} className='film-nav__link'>Details</Link>
        </li>
        <li className={pathname === `${AppRoute.Film}${props.film.id}/review` ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} >
          <Link to={`${AppRoute.Film}${props.film.id}/review`} className='film-nav__link'>Reviews</Link>
        </li>
      </ul>
    </nav>
  );
}
export default MenuFilm;
