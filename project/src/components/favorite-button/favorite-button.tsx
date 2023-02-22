import cn from 'classnames';
import {Offer} from '../../types/offer';

type FavoriteButtonProps = {
  offer: Offer;
  isLarge?: boolean;
};

function FavoriteButton({offer, isLarge}: FavoriteButtonProps): JSX.Element {
  const {isFavorite} = offer;

  return (
    <button
      className={cn('button', {
        'property__bookmark-button': isLarge,
        'property__bookmark-button--active': isLarge && isFavorite,
        'place-card__bookmark-button': !isLarge,
        'place-card__bookmark-button--active': !isLarge && isFavorite
      })}
      type="button"
    >
      <svg
        className="place-card__bookmark-icon"
        width={isLarge ? '31' : '18'}
        height={isLarge ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

export default FavoriteButton;
