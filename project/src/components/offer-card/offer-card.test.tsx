import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import OfferCard from './offer-card';
import {makeFakeOffer} from '../../utils/mocks';

const fakeOffer = makeFakeOffer();

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: OfferCard', () => {
  it('should render correctly main card offer', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferCard offer={fakeOffer} isMainOffer />
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
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferCard offer={fakeOffer} isNearOffer />
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
    const store = mockStore();

    const offerWithPremiumLabel = {
      ...fakeOffer,
      isPremium: true
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferCard offer={offerWithPremiumLabel} isMainOffer />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should dispatch action "selectOffer" if user hover on the card', async () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OfferCard offer={fakeOffer} isMainOffer />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.hover(screen.getByTestId('offer-card'));

    const actions = store.getActions();
    expect(actions[0].type).toBe('OFFERS/selectOffer');
  });
});
