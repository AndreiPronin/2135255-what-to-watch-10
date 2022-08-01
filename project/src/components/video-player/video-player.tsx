import { IFilm } from '../../types/type-films/Type-Films';

interface IPropsFilm{
  film:IFilm;
  activeVideo:boolean;
}
function VideoPlayer(props:IPropsFilm):JSX.Element{
  if(props.activeVideo === true){
    return(
      <video src={'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'} poster={props.film.img} width="280" height="175" controls autoPlay muted ></video>
    );
  }else{
    return(
      <div className="small-film-card__image">
        <img src={props.film.img} alt={props.film.name} width="280" height="175" />
      </div>
    );
  }
}
export default VideoPlayer;
