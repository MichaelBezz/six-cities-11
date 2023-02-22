import {useMemo} from 'react';
import {Helmet} from 'react-helmet-async';
import cn from 'classnames';

import {useAppSelector} from '../../hooks/use-app-selector';
import {getFavoriteOffers} from '../../store/favorite-offers-data/selectors';

import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';

import {Offers, Offer} from '../../types/offer';
import {OfferCardType} from '../../constants';

const mapOffersByLocation = (offers: Offers): Record<string, Offers> =>
  offers.reduce((result: Record<string, Offers>, offer: Offer) => {
    const city = offer.city.name;

    if (!(city in result)) {
      result[city] = [];
    }

    result[city].push(offer);

    return result;
  }, {});

function FavoritePage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavoriteEmpty = favoriteOffers.length;

  const offersByLocation = useMemo(
    () => mapOffersByLocation(favoriteOffers),
    [favoriteOffers]
  );

  return (
    <div className={cn('page', {'page--favorites-empty': isFavoriteEmpty})}>
      <Helmet>
        <title>Six cities: favorite</title>
      </Helmet>

      <Header withNavigation />

      <main className={cn('page__main page__main--favorites', {'page__main--favorites-empty': isFavoriteEmpty})}>
        <div className="page__favorites-container container">
          {isFavoriteEmpty ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByLocation).map(([city, offers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#todo">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} cardType={OfferCardType.Favorites} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="six cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritePage;
