import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

export default function UserNavigation(): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <div className="header__nav-profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          </div>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to={AppRoute.Main}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
