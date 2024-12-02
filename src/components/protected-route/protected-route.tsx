import { FC } from 'react';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector((state) => state.user.user);
  const isAuthenticating = useSelector((state) => state.user.isAuthenticating);

  if (isAuthenticating) {
    return <Preloader />;
  }

  if (onlyUnAuth && !user) {
    return children;
  }

  if (!user) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
