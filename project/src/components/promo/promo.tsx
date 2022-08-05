import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/route-enum';
import { IPropsFilm } from '../../types/type-films/Type-Films';

function Promo(props:IPropsFilm):JSX.Element{
  return(
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={props.film.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
        <div className="film-card__desc">
          <h2 className="film-card__title">{props.film.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{props.film.genre}</span>
            <span className="film-card__year">{props.film.released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span> <Link to={`${AppRoute.Player}${props.film.id}`}>Play</Link></span>
            </button>
            <button className="btn btn--list film-card__button" type="button">
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
              <span><Link to={AppRoute.MyList} className="user-block__link">My list</Link></span>
              <span className="film-card__count">9</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Promo;
