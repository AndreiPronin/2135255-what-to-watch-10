import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../enums/enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddReview from '../../pages/add-review/add-review';
import Film from '../../pages/film/film';
import Login from '../../pages/login/login';
import MainPage from '../../pages/main-page/main-page';
import MyList from '../../pages/my-list/my-list';
import Page404 from '../../pages/page-404/page-404';
import Player from '../../pages/player/player';
import { checkAuthAction } from '../../services/api-action';
import FilmDetailes from '../film-detailes/film-detailes';
import FilmReview from '../film-review/film-review';
import OverviewFilm from '../overview-film/overview-film';
import PrivateRoute from '../private-route/private-route';


function App():JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(checkAuthAction());
  }, [dispatch]);
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.MyList} element={
        <PrivateRoute
          authorization={authorizationStatus}
        >
          <MyList />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={`${AppRoute.Film}:id`} element={<Film />} >
        <Route path='details' element={<FilmDetailes />} />
        <Route path='review' element={<FilmReview />} />
        <Route path='' element={<OverviewFilm />} />
      </Route>
      <Route path={`${AppRoute.AddReview}:id`} element={<AddReview />} />
      <Route path={`${AppRoute.Player}:id`} element={<Player />} />
      <Route path={AppRoute.NotFound} element={<Page404 />} />
    </Routes>
  );
}
export default App;
