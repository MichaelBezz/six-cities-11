import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import OfferProperty from './offer-property';
import {makeFakeOffers, makeFakeOffer} from '../../utils/mocks';

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();

const fakeState = {
  FAVORITE_OFFERS: {
    offers: fakeOffers,
    isLoading: false
  }
};

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: OfferProperty', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferProperty offer={fakeOffer} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-property')).toBeInTheDocument();
  });

  it('should render correctly premium label', () => {
    const store = mockStore(fakeState);

    const offerWithPremiumLabel = {
      ...fakeOffer,
      isPremium: true
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferProperty offer={offerWithPremiumLabel} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
