import { RatitingNumber, RatitingText } from '../../enums/enum';
import { useAppSelector } from '../../hooks';
import { getCurrentFilm } from '../../store/film-process/selectors';

function OverviewFilm():JSX.Element{
  const film = useAppSelector(getCurrentFilm);
  let Raiting = '';
  if(film !== undefined){
    switch(true){
      case(film.rating <= RatitingNumber.Bad) : Raiting = RatitingText.Bad; break;
      case(film.rating <= RatitingNumber.Normal) : Raiting = RatitingText.Normal; break;
      case(film.rating <= RatitingNumber.Good) : Raiting = RatitingText.Good; break;
      case(film.rating <= RatitingNumber.VeryGood) : Raiting = RatitingText.VeryGood; break;
      case(film.rating === RatitingNumber.Awesome) : Raiting = RatitingText.Awesome; break;
    }
  }
  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{Raiting}</span>
          <span className="film-rating__count">{film.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {film.starring}</strong></p>
      </div>
    </>
  );
}
export default OverviewFilm;
