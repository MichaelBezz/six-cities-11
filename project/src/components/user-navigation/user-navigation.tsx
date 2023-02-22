import {memo} from 'react';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getIsAuthorized} from '../../store/user-data/selectors';
import UserAuthorized from '../user-authorized/user-authorized';
import UserUnauthorized from '../user-unauthorized/user-unauthorized';

function UserNavigation(): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    <nav className="header__nav" data-testid="user-navigation">
      <ul className="header__nav-list">
        {isAuthorized
          ? <UserAuthorized />
          : <UserUnauthorized />}
      </ul>
    </nav>
  );
}

export default memo(UserNavigation);
