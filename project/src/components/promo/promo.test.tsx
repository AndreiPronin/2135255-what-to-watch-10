import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import PromoFilm from './promo';
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
      <PromoFilm film={Film} />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Promo" when user navigate', () => {
    history.push('/');
    render(fakeApp);
    expect(screen.getByText(Film.name)).toBeInTheDocument();
    expect(screen.getByText(Film.genre)).toBeInTheDocument();
  });
});
