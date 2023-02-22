import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {selectOffer} from '../../store/offers-data/offers-data';
import FavoriteButton from '../favorite-button/favorite-button';
import {Offer} from '../../types/offer';
import {formatFirstLetter, calculateRatingWidth} from '../../utils/utils';
import {AppRoute, OfferCardType} from '../../constants';

type OfferCardProps = {
  offer: Offer;
  cardType: OfferCardType;
};

function OfferCard({offer, cardType}: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article
      className={`place-card ${cardType}__card`}
      onMouseEnter={() => dispatch(selectOffer(offer))}
      onMouseLeave={() => dispatch(selectOffer(null))}
      data-testid="offer-card"
    >

      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}

      <div className={`place-card__image-wrapper ${cardType}__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={!(cardType === OfferCardType.Favorites) ? '260' : '150'}
            height={!(cardType === OfferCardType.Favorites) ? '200' : '110'}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className={`place-card__info ${cardType}__card-info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton offerId={offer.id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: calculateRatingWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{formatFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
