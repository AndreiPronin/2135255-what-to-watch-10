import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import Loader from './components/loader/loader';
import HistoryRouter from './components/history-rout/history-rout';
import browserHistory from './history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <Loader/>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
