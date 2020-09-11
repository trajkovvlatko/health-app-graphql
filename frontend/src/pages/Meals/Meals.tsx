import AddMeal from 'components/Meals/AddMeal/AddMeal';
import AddMealProductWrapper from 'components/Meals/AddProduct/Wrapper';
import MealsListWrapper from 'components/Meals/MealsList/Wrapper';
import MealTypeForm from 'components/Meals/MealType/Form';
import MealPendingProductsList from 'components/Meals/PendingProducts/List';
import React from 'react';
import './Meals.scss';

function Meals() {
  return (
    <div className='meals-page'>
      <h1>Meals page</h1>
      <div>
        <MealTypeForm />
        <AddMealProductWrapper />
        <MealPendingProductsList />
        <AddMeal />
      </div>
      ---------
      <MealsListWrapper />
    </div>
  );
}

export default Meals;
