import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import {
  burgerSlice,
  fetchIngredients
} from '../../services/reducers/burger-slice';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.burger.ingredients);

  useEffect(() => {
    const id = params.id;
    if (id) {
      if (items.length === 0) {
        dispatch(fetchIngredients());
      } else {
        dispatch(burgerSlice.actions.updateIngredientsData(id));
      }
    }
  }, [params.id, items]);

  const ingredientData = useSelector((state) => state.burger.ingredientsData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
