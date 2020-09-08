import AddMealForm from 'components/Meals/Add/Form';
import ListMealsWrapper from 'components/Meals/List/Wrapper';
import React from 'react';
import './Meals.scss';

function Meals() {
  return (
    <div className='meals-page'>
      <h1>Meals page</h1>

      <AddMealForm />
      <ListMealsWrapper />
    </div>
  );
}

export default Meals;
