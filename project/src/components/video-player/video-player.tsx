import { IFilm } from '../../types/type-films/Type-Films';

interface IPropsFilm{
  film:IFilm;
  activeVideo:boolean;
}
function VideoPlayer(props:IPropsFilm):JSX.Element{
  if(props.activeVideo === true){
    return(
      <video src={props.film.previewVideoLink} poster={props.film.previewImage} width="280" height="175" controls autoPlay muted ></video>
    );
  }else{
    return(
      <div className="small-film-card__image">
        <img src={props.film.posterImage} alt={props.film.name} width="280" height="175" />
      </div>
    );
  }
}
export default VideoPlayer;
