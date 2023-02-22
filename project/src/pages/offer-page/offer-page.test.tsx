import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import OfferPage from './offer-page';
import {State} from '../../types/state';
import {makeFakeUserData, makeFakeOffers, makeFakeOffer, makeFakeNearOffers, makeFakeReviews} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, Location, SortType} from '../../constants';

const fakeUserData = makeFakeUserData();
const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeNearOffers = makeFakeNearOffers();
const fakeReviews = makeFakeReviews();

const fakeState = {
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuthorized,
    userData: fakeUserData
  },
  OFFERS: {
    location: Location.Paris,
    sortType: SortType.Popular,
    offers: fakeOffers,
    selectedOffer: fakeOffer,
    isOffersLoading: false
  },
  OFFER_PROPERTY: {
    offerProperty: fakeOffer,
    isOfferPropertyLoading: false,
    hasOfferPropertyError: false,
    nearOffers: fakeNearOffers,
    reviews: fakeReviews,
    isReviewFormBlocked: false
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

describe('Component: OfferPropertyPage', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeState);
    history.push(`${AppRoute.Offer}/${fakeOffer.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-page')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('offer-property')).toBeInTheDocument();
    expect(screen.getByTestId('offer-host')).toBeInTheDocument();
    expect(screen.getByTestId('review-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('near-offer-section')).toBeInTheDocument();
  });
});
