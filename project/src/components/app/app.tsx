import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../enums/enum';
import browserHistory from '../../history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddReview from '../../pages/add-review/add-review';
import Detailes from '../../pages/film-detailes/film-detailes';
import FilmReview from '../../pages/film-review/film-review';
import Film from '../../pages/film/film';
import Login from '../../pages/login/login';
import MainPage from '../../pages/main-page/main-page';
import MyList from '../../pages/my-list/my-list';
import Page404 from '../../pages/page-404/page-404';
import Player from '../../pages/player/player';
import { checkAuthAction } from '../../services/api-action';
import HistoryRouter from '../history-rout/history-rout';
import PrivateRoute from '../private-route/private-route';


function App():JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => () => {
    dispatch(checkAuthAction());
  }, [dispatch]);
  return (
    <HistoryRouter history={browserHistory} >
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
        <Route path={`${AppRoute.Film}:id`} element={<Film />} />
        <Route path={`${AppRoute.Film}:id/details`} element={<Detailes />} />
        <Route path={`${AppRoute.Film}:id/review`} element={<FilmReview />} />
        <Route path={`${AppRoute.AddReview}:id`} element={<AddReview />} />
        <Route path={`${AppRoute.Player}:id`} element={<Player />} />
        <Route path={AppRoute.NotFound} element={<Page404 />} />
      </Routes>
    </HistoryRouter>
  );
}
export default App;
