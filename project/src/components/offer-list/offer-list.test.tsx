import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import OfferList from './offer-list';
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

describe('Component: OfferList', () => {
  it('should render correctly main card offer', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferList offers={fakeOffers} isMainOffer />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const articleElement = screen.getByTestId('offer-list');

    expect(articleElement).toBeInTheDocument();
    expect(articleElement).toHaveClass('cities__places-list');
    expect(articleElement).not.toHaveClass('near-places__list');
  });

  it('should render correctly near card offer', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferList offers={fakeOffers} isNearOffer />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const articleElement = screen.getByTestId('offer-list');

    expect(articleElement).toBeInTheDocument();
    expect(articleElement).not.toHaveClass('cities__places-list');
    expect(articleElement).toHaveClass('near-places__list');
  });
});
