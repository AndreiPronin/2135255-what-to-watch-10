
import { DateOption } from '../../enums/enum';
import { useAppSelector } from '../../hooks';
import { getAllComment } from '../../store/film-process/selectors';


function FilmReview():JSX.Element{
  const comment = useAppSelector(getAllComment);
  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        { comment.length > 0 && (
          comment.map((Item)=>
            (
              <div key={Item.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{Item.comment}</p>
                  <footer className="review__details">
                    <cite className="review__author">{Item.user.name}</cite>
                    <time className="review__date">{new Date(Item.date).toLocaleString(
                      DateOption.location, { year: DateOption.year, month: DateOption.month, day: DateOption.day })}
                    </time>
                  </footer>
                </blockquote>
                <div className="review__rating">{Item.rating}</div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
export default FilmReview;
