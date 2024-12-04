import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { burgerSlice } from '../../services/reducers/burger-slice';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = params.id;
    if (id) {
      dispatch(burgerSlice.actions.updateIngredientsData(id));
    }
  }, [params.id]);

  const ingredientData = useSelector((state) => state.burger.ingredientsData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
