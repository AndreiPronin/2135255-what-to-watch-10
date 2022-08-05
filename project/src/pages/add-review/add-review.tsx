import React, { FormEvent, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilmFooter from '../../components/film-footer/film-footer';
import { AppRoute } from '../../enums/route-enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllFilmAction, getFilm, SaveComment } from '../../services/api-action';
import { SaveModelComment } from '../../types/type-films/Type-Films';

function AddReview():JSX.Element{
  const [formData,SetFormData] = useState({
    rating:'',
    reviewText:''
  });
  const {id} = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(getFilm(id as string));
    dispatch(getAllFilmAction());
  },[dispatch,id]);
  const { filmListAll } = useAppSelector(
    (state) => state
  );
  const film = filmListAll.filter((item)=> (item.id === Number(id)))[0];
  const ArrayRaiting = [10,9,8,7,6,5,4,3,2,1];
  const Comment : SaveModelComment = {
    idFilms: id as string,
    comment:formData.reviewText,
    rating: Number(formData.rating)
  };
  const HandleChange = (e:React.ChangeEvent) =>{
    const {name,value} = e.target as HTMLInputElement;
    SetFormData({...formData, [name]: value});
  };
  const handleSubmitLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if ( Comment.rating > 0 && Comment.comment !== '') {
      onSubmitLogin(Comment);
    }
  };
  const onSubmitLogin = (comment: SaveModelComment) => {
    dispatch(SaveComment(comment));
  };
  return(
    <>
      {film !== undefined &&
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={`${AppRoute.Film}${film.id}` }>The Grand Budapest Hotel</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link to={`${AppRoute.AddReview}/${id}`} className="breadcrumbs__link">Add review</Link>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link to={AppRoute.Login} className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film.previewImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" onSubmit={handleSubmitLogin} className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                {
                  ArrayRaiting.map((i) =>(
                    <>
                      <input key={i} onChange={HandleChange} className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} />
                      <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
                    </>
                  ))
                }
              </div>
            </div>
            <div className="add-review__text">
              <textarea onChange={HandleChange} className="add-review__textarea" name="reviewText" id="review-text" placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type='submit' >Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>}
      {<FilmFooter typeFilms={film} films={filmListAll} />}
    </>
  );
}
export default AddReview;
