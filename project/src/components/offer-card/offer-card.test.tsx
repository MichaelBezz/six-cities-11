import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import OfferCard from './offer-card';
import {makeFakeOffers, makeFakeOffer} from '../../utils/mocks';
import {OfferCardType} from '../../constants';

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

describe('Component: OfferCard', () => {
  it('should render correctly main card offer', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferCard offer={fakeOffer} cardType={OfferCardType.Cities} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const articleElement = screen.getByTestId('offer-card');

    expect(articleElement).toBeInTheDocument();
    expect(articleElement).toHaveClass('cities__card');
    expect(articleElement).not.toHaveClass('near-places__card');
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

  it('should render correctly near card offer', () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferCard offer={fakeOffer} cardType={OfferCardType.NearPlaces} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const articleElement = screen.getByTestId('offer-card');

    expect(articleElement).toBeInTheDocument();
    expect(articleElement).not.toHaveClass('cities__card');
    expect(articleElement).toHaveClass('near-places__card');
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
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
            <OfferCard offer={offerWithPremiumLabel} cardType={OfferCardType.Cities} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should dispatch action "selectOffer" if user hover on the card', async () => {
    const store = mockStore(fakeState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferCard offer={fakeOffer} cardType={OfferCardType.Cities} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.hover(screen.getByTestId('offer-card'));

    const actions = store.getActions();
    expect(actions[0].type).toBe('OFFERS/selectOffer');
  });
});
