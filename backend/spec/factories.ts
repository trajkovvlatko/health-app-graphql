import Meal from '../entity/Meal';
import MealType from '../entity/MealType';
import Product from '../entity/Product';
import User from '../entity/User';

interface IOptions {
  [key: string]: string | boolean | number | Date;
}

async function create(table: 'meals', options: IOptions): Promise<Meal>;
async function create(
  table: 'meal_types',
  options: IOptions,
): Promise<MealType>;
async function create(table: 'products', options: IOptions): Promise<Product>;
async function create(table: 'users', options: IOptions): Promise<User>;
async function create(table: string, options: IOptions = {}): Promise<unknown> {
  switch (table) {
    case 'meals':
      return await addMeal(options);
    case 'meal_types':
      return await addMealType(options);
    case 'products':
      return await addProduct(options);
    case 'users':
      return await addUser(options);
    default:
      throw `No factory for table '${table}'`;
  }
}

async function addMeal(options: IOptions): Promise<Meal> {
  const meal = new Meal();
  if (typeof options.userId === 'number') meal.userId = options.userId;
  if (typeof options.mealTypeId === 'number')
    meal.mealTypeId = options.mealTypeId;
  return meal.save();
}

async function addMealType(options: IOptions): Promise<MealType> {
  const mealType = new MealType();
  if (typeof options.name === 'string') mealType.name = options.name;
  if (typeof options.active === 'boolean') mealType.active = options.active;
  return mealType.save();
}

async function addProduct(options: IOptions): Promise<Product> {
  const p = new Product();
  if (typeof options.name === 'string') p.name = options.name;
  if (typeof options.measure === 'string') p.measure = options.measure;
  if (typeof options.calories === 'number') p.calories = options.calories;
  return p.save();
}

async function addUser(options: IOptions): Promise<User> {
  const u = new User();
  if (typeof options.email === 'string') u.email = options.email;
  if (typeof options.password === 'string') u.password = options.password;
  if (typeof options.active === 'boolean') u.active = options.active;
  return u.save();
}

export default create;
