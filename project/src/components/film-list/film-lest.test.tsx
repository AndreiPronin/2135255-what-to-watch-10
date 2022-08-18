import {render,screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-rout/history-rout';
import { AllFilms } from '../../Moq/Films-List';
import FilmList from './film-list';

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <FilmList films={AllFilms} />
  </HistoryRouter>
);

describe('Application Routing', () => {
  it('should render "FilmList" when user navigate', () => {
    render(fakeApp);
    expect(screen.getByTestId('FilmList')).toBeInTheDocument();
  });
});
