import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/route-enum';
import { IFilm } from '../../types/type-films/Type-Films';
import VideoPlayer from '../video-player/video-player';
interface IPropsFilm{
  film:IFilm;
  IsActiveVideo:boolean;
  mouseOver:React.MouseEventHandler<HTMLElement>;
  mouseOut:React.MouseEventHandler<HTMLElement>;
}
function FilmCard(props:IPropsFilm):JSX.Element{
  return(
    <article onMouseOver={props.mouseOver} onMouseOut={props.mouseOut} data-id={props.film.id} className="small-film-card catalog__films-card">
      <VideoPlayer film={props.film} activeVideo={props.IsActiveVideo} />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Film}${props.film.id}`}>
          {props.film.name} дата выхода {props.film.date.toDateString()}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
