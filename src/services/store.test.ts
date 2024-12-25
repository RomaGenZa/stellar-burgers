import { rootReducer, RootState } from './store'; // Импортируем rootReducer и тип RootState
import { burgerSlice } from './reducers/burger-slice';
import { feedSlice } from './reducers/feed-slice';
import { userSlice } from './reducers/user-slice';

describe('Тестирование rootReducer', () => {
  it('Проверка корректной инициализации состояний', () => {
    const initialState: RootState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState.burger).toEqual(
      burgerSlice.reducer(undefined, { type: '@@INIT' })
    );

    expect(initialState.feed).toEqual(
      feedSlice.reducer(undefined, { type: '@@INIT' })
    );

    expect(initialState.user).toEqual(
      userSlice.reducer(undefined, { type: '@@INIT' })
    );
  });
});
