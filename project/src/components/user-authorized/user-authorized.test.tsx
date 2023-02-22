import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import UserAuthorized from './user-authorized';
import {State} from '../../types/state';
import {makeFakeOffers, makeFakeUserData} from '../../utils/mocks';
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

describe('Component: UserAuthorized', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserAuthorized />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeUserData.name}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeUserData.email}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should despatch action "logoutAction" if user click to the "Sign out" link', async () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserAuthorized />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByText(/Sign out/i);
    await userEvent.click(linkElement);

    const actions = store.getActions();
    const logout = actions.find((action) => action.type === 'USER/logout/pending');
    expect(logout?.type).toBe('USER/logout/pending');
  });
});
