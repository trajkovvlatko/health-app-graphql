import IMealType from 'interfaces/IMealType';
import React from 'react';

interface IProps {
  onClick: (mealType: IMealType) => void;
  mealType: IMealType;
  active: boolean;
}

function MealTypeItem(props: IProps) {
  const {onClick, mealType, active} = props;
  return (
    <button
      className={`${active ? 'active' : ''}`}
      onClick={() => onClick(mealType)}
    >
      {mealType.name}
    </button>
  );
}

export default MealTypeItem;
