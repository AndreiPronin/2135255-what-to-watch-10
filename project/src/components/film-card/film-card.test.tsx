import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import FilmCard from './film-card';
import thunk from 'redux-thunk';
import { AllFilms,Film,Promo } from '../../Moq/Films-List';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isLoad: false , favoriteFilms: AllFilms, filmListAll : AllFilms, promo: Promo, currentFilm: Promo},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <FilmCard film={Film} isActiveVideo mouseOut={jest.fn()} mouseOver={jest.fn()} />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "FilmCard" when user navigate', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
