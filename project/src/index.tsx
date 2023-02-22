import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './services/browser-history';

import {store} from './store/store';
import {checkAuthorization} from './store/user-data/api-actions';
import {fetchOffersAction} from './store/offers-data/api-actions';

import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuthorization());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
        <ToastContainer />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
