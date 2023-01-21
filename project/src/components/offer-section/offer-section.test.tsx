import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import OfferSection from './offer-section';
import {makeFakeOffers} from '../../utils/mocks';
import {Location, SortType} from '../../constants';

const fakeOffers = makeFakeOffers();

const fakeState = {
  OFFERS: {
    location: Location.Paris,
    sortType: SortType.Popular,
    offers: fakeOffers,
    selectedOffer: fakeOffers[0],
    isOffersLoading: false
  }
};

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: OfferSection', () => {
  beforeAll(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  it('should render correctly', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferSection
              location={fakeState.OFFERS.location}
              sortType={fakeState.OFFERS.sortType}
              offers={fakeState.OFFERS.offers}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-section')).toBeInTheDocument();
    expect(screen.getByTestId('sort')).toBeInTheDocument();
    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
  });

  it('should render correctly location and number of offers', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferSection
              location={fakeState.OFFERS.location}
              sortType={fakeState.OFFERS.sortType}
              offers={fakeState.OFFERS.offers}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(
      new RegExp(`${fakeState.OFFERS.offers.length} places to stay in ${fakeState.OFFERS.location}`, 'i')
    )).toBeInTheDocument();
  });
});
