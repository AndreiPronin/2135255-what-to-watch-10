import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import thunk from 'redux-thunk';
import { Promo } from '../../Moq/Films-List';
import Overview from './overview-film';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isLoad: false , currentFilm: Promo},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Overview />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Overview" when user navigate', () => {
    render(fakeApp);
    expect(screen.getByText('Awesome')).toBeInTheDocument();
  });
});
