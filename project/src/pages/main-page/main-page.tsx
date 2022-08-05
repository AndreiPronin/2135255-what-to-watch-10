import { useEffect } from 'react';
import FilmList from '../../components/film-list/film-list';
import FilmNavigate from '../../components/film-navigate/film-navigate';
import Header from '../../components/header/header';
import { useAppDispatch,useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/action';
//import {getQuantityFilms} from '../../store/selectors';
//import { useSelector } from 'react-redux';
import { getAllFilmAction } from '../../services/api-action';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/route-enum';

function MainPage(): JSX.Element {

  const promo = useAppSelector((state) => state.promo);
  //const quantityFilms = useSelector(getQuantityFilms);
  const { filmsList,activeFilmsCardsNumber,quantityFilms } = useAppSelector(
    (state) => state
  );
  const isShowMore = quantityFilms > activeFilmsCardsNumber;
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(getAllFilmAction());
  }, [dispatch]);
  return (
    <>
      <Header film={promo} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmNavigate />
          <FilmList films={filmsList} />
          {isShowMore && (
            <div className="catalog__more">
              <button className="catalog__button" onClick={ ()=>dispatch(showMoreFilms())} type="button">Show more</button>
            </div>
          )}

        </section>
        <div className="page-footer">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© {new Date().getFullYear()} What to watch Ltd.</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
