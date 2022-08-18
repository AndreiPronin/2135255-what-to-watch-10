import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../enums/enum';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-rout/history-rout';
import thunk from 'redux-thunk';
import { Comment } from '../../Moq/Film-Comment';
import FilmReview from './film-review';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isLoad: false , comment:Comment},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <FilmReview />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "FilmReview" when user navigate', () => {
    render(fakeApp);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
