import { Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/film-process/film-process';
import { INITIAL_GENRE } from '../../store/const';
import { getActiveGenre, getAllGenre } from '../../store/film-process/selectors';

function FilmNavigate():JSX.Element{
  const activeGenre = useAppSelector(getActiveGenre);
  const allGenre = useAppSelector(getAllGenre);
  const dispatch = useAppDispatch();
  return(
    <ul className="catalog__genres-list">
      <li className={ activeGenre === INITIAL_GENRE ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'} >
        <Link to="/" onClick={() => dispatch(changeGenre(INITIAL_GENRE))} className="catalog__genres-link">
          All genres
        </Link>
      </li>
      {allGenre?.map((item)=>(
        <li key={item} className={ activeGenre === item ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'} >
          <Link to="/" onClick={() => dispatch(changeGenre(item))} className="catalog__genres-link">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default FilmNavigate;
