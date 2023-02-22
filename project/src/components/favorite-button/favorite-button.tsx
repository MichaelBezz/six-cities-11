import {useNavigate} from 'react-router-dom';
import cn from 'classnames';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useAppSelector} from '../../hooks/use-app-selector';
import {setFavoriteOffer} from '../../store/favorite-offers-data/api-actions';
import {getIsAuthorized} from '../../store/user-data/selectors';
import {getFavoriteOffers} from '../../store/favorite-offers-data/selectors';
import {OfferId} from '../../types/offer';
import {AppRoute} from '../../constants';

type FavoriteButtonProps = {
  offerId: OfferId;
  isLarge?: boolean;
};

function FavoriteButton({offerId, isLarge}: FavoriteButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavorite = favoriteOffers.find((item) => item.id === offerId);

  const handleButtonClick = () => {
    if (isAuthorized) {
      dispatch(setFavoriteOffer({
        offerId,
        status: isFavorite ? 0 : 1
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={cn('button', {
        'property__bookmark-button': isLarge,
        'property__bookmark-button--active': isLarge && isFavorite,
        'place-card__bookmark-button': !isLarge,
        'place-card__bookmark-button--active': !isLarge && isFavorite
      })}
      type="button"
      onClick={handleButtonClick}
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
