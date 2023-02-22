import './user-authorized.css';
import {MouseEvent} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getUserData} from '../../store/user-data/selectors';
import {logout} from '../../store/user-data/api-actions';

function UserAuthorized(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  return (
    <>
      <li className="header__nav-item user">
        <div className="header__nav-profile">
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
        </div>
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
