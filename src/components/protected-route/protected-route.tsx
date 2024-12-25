import { FC } from 'react';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state) => state.user.user !== null);
  const isAuthenticating = useSelector((state) => state.user.isAuthenticating);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (isAuthenticating) {
    return <Preloader />;
  }

  if (onlyUnAuth && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
