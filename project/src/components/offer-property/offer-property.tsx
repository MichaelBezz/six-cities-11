import FavoriteButton from '../favorite-button/favorite-button';
import {Offer} from '../../types/offer';
import {formatFirstLetter, calculateRatingWidth} from '../../utils/utils';

type OfferPropertyProps = {
  offer: Offer;
};

function OfferProperty({offer}: OfferPropertyProps): JSX.Element {
  return (
    <>
      {offer.isPremium &&
      <div className="property__mark">
        <span>Premium</span>
      </div>}

      <div className="property__name-wrapper" data-testid="offer-property">
        <h1 className="property__name">{offer.title}</h1>
        <FavoriteButton offer={offer} isLarge />
      </div>

      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: calculateRatingWidth(offer.rating)}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{offer.rating}</span>
      </div>

      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {formatFirstLetter(offer.type)}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {`${offer.bedrooms} Bedrooms`}
        </li>
        <li className="property__feature property__feature--adults">
          {`Max ${offer.maxAdults} adults`}
        </li>
      </ul>

      <div className="property__price">
        <b className="property__price-value">&euro;{offer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>

      {offer.goods.length &&
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {offer.goods.map((good) => (
            <li className="property__inside-item" key={good}>
              {formatFirstLetter(good)}
            </li>
          ))}
        </ul>
      </div>}
    </>
  );
}

export default OfferProperty;
