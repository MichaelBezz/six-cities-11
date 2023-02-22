import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import NearOfferSection from './near-offer-section';
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

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: NearOfferSection', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <NearOfferSection offers={fakeOffers} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('near-offer-section')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighborhood/i)).toBeInTheDocument();
  });
});
