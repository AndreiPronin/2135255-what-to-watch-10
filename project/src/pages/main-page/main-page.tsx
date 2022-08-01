import { useEffect } from 'react';
import FilmList from '../../components/film-list/film-list';
import FilmNavigate from '../../components/film-navigate/film-navigate';
import Header from '../../components/header/header';
import { useAppDispatch,useAppSelector } from '../../hooks';
import { resetFilmsList, showMoreFilms } from '../../store/action';
import { IPropsFilms } from '../../types/type-films/Type-Films';

function MainPage(props:IPropsFilms): JSX.Element {
  const { filmsList,activeFilmsCardsNumber,quantityFilms } = useAppSelector(
    (state) => state
  );
  const isShowMore = quantityFilms > activeFilmsCardsNumber;
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(resetFilmsList());
  }, []);
  return (
    <>
      <Header film={props.films[0]} />
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
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
