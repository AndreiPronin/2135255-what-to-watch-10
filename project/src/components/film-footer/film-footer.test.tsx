import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import thunk from 'redux-thunk';
import { AllFilms,Promo } from '../../Moq/Films-List';
import FilmFooter from './film-footer';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isLoad: false , similarFilm: AllFilms},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <FilmFooter typeFilms={Promo} />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "FilmDetailes" when user navigate', () => {
    render(fakeApp);
    expect(screen.getByText('More like this')).toBeInTheDocument();
  });
});
