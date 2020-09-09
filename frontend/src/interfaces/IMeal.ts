export default interface IMeal {
  id?: number;
  mealType: {
    name: string;
  };
  mealProducts: {
    amount: number;
    product: {
      name: string;
      measure: string;
      calories: number;
    };
  };
}
