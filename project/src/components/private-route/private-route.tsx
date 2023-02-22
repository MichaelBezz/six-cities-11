import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getIsAuthorized} from '../../store/user-data/selectors';
import {AppRoute} from '../../constants';

type PrivateRouteProps = {
  privateComponent: JSX.Element;
}

function PrivateRoute({privateComponent}: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    isAuthorized
      ? privateComponent
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
