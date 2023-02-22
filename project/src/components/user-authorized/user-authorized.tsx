import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../constants';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useAppSelector} from '../../hooks/use-app-selector';
import { getFavoriteOffers } from '../../store/favorite-offers-data/selectors';
import {logout} from '../../store/user-data/api-actions';
import {getUserData} from '../../store/user-data/selectors';
import './user-authorized.css';

function UserAuthorized(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <>
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorite}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img
              className="header__avatar-image"
              src={userData?.avatarUrl}
              width="20"
              height="20"
              alt={userData?.name}
            />
          </div>
          <span className="header__user-name user__name">{userData?.email}</span>
          <span className="header__favorite-count">{favoriteOffers.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a
          className="header__nav-link"
          href="#todo"
          onClick={(event: MouseEvent) => {
            event.preventDefault();

            dispatch(logout());
          }}
        >
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </>
  );
}

export default UserAuthorized;
