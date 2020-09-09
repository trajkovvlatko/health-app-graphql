import AddMealProductWrapper from 'components/Meals/AddProduct/Wrapper';
import ListMealsWrapper from 'components/Meals/List/Wrapper';
import MealTypeForm from 'components/Meals/MealType/Form';
import React from 'react';
import './Meals.scss';

function Meals() {
  return (
    <div className='meals-page'>
      <h1>Meals page</h1>
      <MealTypeForm />

      <AddMealProductWrapper />

      <ListMealsWrapper />
    </div>
  );
}

export default Meals;
