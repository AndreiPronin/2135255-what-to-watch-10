import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { getPromoFilmAction } from './services/api-action';
import Loader from './components/loader/loader';

store.dispatch(getPromoFilmAction());
//store.dispatch(getAllFilmAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Loader/>
      <App />
    </Provider>
  </React.StrictMode>,
);
