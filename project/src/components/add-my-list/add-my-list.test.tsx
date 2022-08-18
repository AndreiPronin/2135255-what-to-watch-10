import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import thunk from 'redux-thunk';
import { AllFilms,Film,Promo } from '../../Moq/Films-List';
import AddMyList from './add-my-list';

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
      <AddMyList film={Film} />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "AddMyList" when user navigate', () => {
    render(fakeApp);
    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
