import FilmCard from '../film-card/film-card';
import { IPropsFilms } from '../../types/type-films/Type-Films';
import { useMouseHover } from '../../hooks/mouse-hover';

function FilmList(props:IPropsFilms):JSX.Element{
  const {MouseOver,MouseOut,activVideo} = useMouseHover();
  return(
    <div className="catalog__films-list">
      {
        props.films.map((film)=>
          <FilmCard key={film.id} film={film} isActiveVideo={Number(activVideo) === film.id} mouseOver={MouseOver} mouseOut={MouseOut} />
        )
      }
    </div>
  );
}
export default FilmList;
