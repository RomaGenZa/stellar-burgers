import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';
import { useNavigate } from 'react-router-dom';
import { burgerSlice, orderBurger } from '../../services/reducers/burger-slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state) => state.burger.burgerConstructor
  );

  const orderRequest = useSelector((state) => state.burger.orderRequest);
  const orderModalData = useSelector((state) => state.burger.orderModalData);
  const isAuthenticated = useSelector((state) => state.user.user !== null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const burgerConstructor = useSelector(
    (state) => state.burger.burgerConstructor
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(
      orderBurger([
        burgerConstructor.bun?._id ?? '',
        ...burgerConstructor.ingredients.map((i) => i._id ?? '')
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(burgerSlice.actions.clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
