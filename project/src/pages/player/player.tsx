import { useParams,useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { useGetFilmsProperty } from '../../hooks/load-films';
import { getAllFilms } from '../../store/film-process/selectors';

function Player():JSX.Element{
  const naveigate = useNavigate();
  const {id} = useParams();
  useGetFilmsProperty(id as string);
  const filmListAll = useAppSelector(getAllFilms);
  const film = filmListAll.filter((item)=> (item.id === Number(id)))[0];
  return(

    <div className="player">

      {film !== undefined &&
      <>
        <video src={film.previewVideoLink} className="player__video" poster={film.previewImage} controls autoPlay></video>
        <button type="button" onClick={()=> naveigate(-1)} className="player__exit">Exit</button>
      </>}

      {/* <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left:'30%;'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div> */}
    </div>
  );
}
export default Player;
