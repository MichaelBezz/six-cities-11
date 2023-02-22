import {Provider} from 'react-redux';
import {AnyAction} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {HelmetProvider} from 'react-helmet-async';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {createAPI} from '../../services/api';
import HistoryRouter from '../../components/history-route/history-route';
import UserNavigation from './user-navigation';
import {State} from '../../types/state';
import {makeFakeUserData, makeFakeOffers} from '../../utils/mocks';
import {AuthorizationStatus} from '../../constants';

const fakeUserData = makeFakeUserData();
const fakeOffers = makeFakeOffers();

const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuthorized,
    userData: fakeUserData
  },
  FAVORITE_OFFERS: {
    offers: fakeOffers,
    isLoading: false
  }
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);

const history = createMemoryHistory();

describe('Component: UserNavigation', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserNavigation />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-navigation')).toBeInTheDocument();
  });

  it('should render "user-authorized" component if user has status authorized', () => {
    const store = mockStore({
      ...fakeState,
      USER: {...fakeState.USER, authorizationStatus: AuthorizationStatus.Authorized}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserNavigation />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-navigation')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render "user-unauthorized" component if user has status un_authorized', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserNavigation />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-navigation')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
