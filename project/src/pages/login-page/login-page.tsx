import {Helmet} from 'react-helmet-async';
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getAuthorizationStatus} from '../../store/user-data/selectors';
import {changeLocation} from '../../store/offers-data/offers-data';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import {LOCATIONS} from '../../components/location-list/location-list';
import {AppRoute, AuthorizationStatus, Location} from '../../const';

const getRandomLocation = (locations: Location[]): Location => {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
};

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Authorized) {
    return <Navigate to={AppRoute.Main} />;
  }

  const randomLocation = getRandomLocation(LOCATIONS);

  return (
    <div className="page page--gray page--login" data-testid="login-page">
      <Helmet>
        <title>Six cities: sign in</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => dispatch(changeLocation(randomLocation))}
                data-testid="locations-link"
              >
                <span>{randomLocation}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
