import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader, ProfileMenuUI } from '@ui';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) =>
  // const isAuthChecked = useSelector(isAuthCheckedSelector);
  // const user = useSelector(userDataSelector);
  //
  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }
  //
  // if (!onlyUnAuth && !user) {
  //   return <Navigate replace to='/login' />;
  // }

  children;
