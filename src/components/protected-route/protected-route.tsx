import { FC } from 'react';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAuthenticating = useSelector((state) => state.user.isAuthenticating);

  if (isAuthenticating) {
    return <Preloader />;
  }

  if (!isLoggedIn) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
