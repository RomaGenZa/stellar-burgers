import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/reducers/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const isLoading = useSelector((state) => state.feed.isLoading);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <h1 style={{ textAlign: 'center' }}>Свободная касса!</h1>;
  }

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
