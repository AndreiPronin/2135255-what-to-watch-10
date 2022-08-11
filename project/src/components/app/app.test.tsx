import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import App from './app';
import thunk from 'redux-thunk';
import { AllFilms } from '../../Moq/Films-List';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);


const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isLoad: false , favoriteFilms: AllFilms},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/*');
    render(fakeApp);
    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
  it('should render "MainScrin" test', () => {
    history.push(AppRoute.Login);
    render(fakeApp);
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
  it('should render "MyList" test', () => {
    history.push(AppRoute.MyList);
    render(fakeApp);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });
});
