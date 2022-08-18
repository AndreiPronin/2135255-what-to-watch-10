import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Loader from './loader';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: AudioPlayer', () => {
  it('should render correctly is loading', () => {
    const store = mockStore({
      DATA: {isLoad: true},
    });
    render(
      <Provider store={store}>
        <Loader />
      </Provider>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('should render correctly is no-loading', () => {
    const store = mockStore({
      DATA: {isLoad: false},
    });
    render(
      <Provider store={store}>
        <Loader />
      </Provider>,
    );
    expect(screen.getByTestId('no-loader')).toBeInTheDocument();
  });
});
