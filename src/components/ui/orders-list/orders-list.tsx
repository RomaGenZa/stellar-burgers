import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.length === 0 ? (
      <h1 style={{ textAlign: 'center' }}>Перепиши историю, сделай заказ!</h1>
    ) : (
      orderByDate.map((order) => <OrderCard order={order} key={order._id} />)
    )}
  </div>
);
