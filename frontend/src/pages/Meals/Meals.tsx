import AddMealWrapper from 'components/Meals/Add/Wrapper';
import ListMealsWrapper from 'components/Meals/List/Wrapper';
import React from 'react';
import './Meals.scss';

function Meals() {
  return (
    <div className='meals-page'>
      <h1>Meals page</h1>

      <AddMealWrapper />
      <ListMealsWrapper />
    </div>
  );
}

export default Meals;
