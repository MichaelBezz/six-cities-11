import {AnyAction} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import App from './app';
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
const store = mockStore(fakeState);

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/" route', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer/:id" route', () => {
    history.push(`${AppRoute.Offer}/${fakeOffer.id}`);

    render(fakeApp);

    expect(screen.getByTestId('offer-page')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login" route', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
