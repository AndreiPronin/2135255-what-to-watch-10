import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import thunk from 'redux-thunk';
import { AllFilms,Promo } from '../../Moq/Films-List';
import FilmNavigate from './film-navigate';

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
      <FilmNavigate />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "FilmNavigate" when user navigate', () => {
    render(fakeApp);
    expect(screen.getByText('All genres')).toBeInTheDocument();
  });
});
