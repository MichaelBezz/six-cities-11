import {Link} from 'react-router-dom';
import cn from 'classnames';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {selectOffer} from '../../store/offers-data/offers-data';
import FavoriteButton from '../favorite-button/favorite-button';
import {Offer} from '../../types/offer';
import {formatFirstLetter, calculateRatingWidth} from '../../utils/utils';
import {AppRoute} from '../../constants';

type OfferCardProps = {
  offer: Offer;
  isMainOffer?: boolean;
  isNearOffer?: boolean;
};

function OfferCard({offer, isMainOffer, isNearOffer}: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article
      className={cn('place-card', {
        'cities__card': isMainOffer,
        'near-places__card': isNearOffer
      })}
      onMouseEnter={() => dispatch(selectOffer(offer))}
      onMouseLeave={() => dispatch(selectOffer(null))}
      data-testid="offer-card"
    >

      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}

      <div
        className={cn('place-card__image-wrapper', {
          'cities__image-wrapper': isMainOffer,
          'near-places__image-wrapper': isNearOffer
        })}
      >
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton offer={offer} />
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
