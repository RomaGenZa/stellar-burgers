import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { getUser } from '../../services/reducers/user-slice';
import { useDispatch } from '../../services/store';
import { fetchFeed } from '../../services/reducers/feed-slice';
import {
  burgerSlice,
  fetchIngredients
} from '../../services/reducers/burger-slice';

const App = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
    dispatch(fetchFeed());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} index />

        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/feed/:number'
          element={
            <Modal
              title={''}
              onClose={() => {
                dispatch(burgerSlice.actions.clearOrderData());
                navigation('/feed');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингридиента'
              onClose={() => {
                dispatch(burgerSlice.actions.clearIngredientsState());
                navigation('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal
                title=''
                onClose={() => {
                  dispatch(burgerSlice.actions.clearOrderData());
                  navigation('/profile/orders');
                }}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
