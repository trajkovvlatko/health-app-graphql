import Meal from '../src/entity/Meal';
import MealType from '../src/entity/MealType';
import Product from '../src/entity/Product';
import User from '../src/entity/User';
import bcrypt from 'bcrypt';

function rand() {
  return Math.random().toString(36).substring(7);
}

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
  meal.userId =
    typeof options.userId === 'number'
      ? options.userId
      : (await create('users', {})).id;
  meal.mealTypeId =
    typeof options.mealTypeId === 'number'
      ? options.mealTypeId
      : (await create('meal_types', {})).id;
  return meal.save();
}

async function addMealType(options: IOptions): Promise<MealType> {
  const mealType = new MealType();
  mealType.name = typeof options.name === 'string' ? options.name : rand();
  mealType.active = typeof options.active === 'boolean' ? options.active : true;
  return mealType.save();
}

async function addProduct(options: IOptions): Promise<Product> {
  const p = new Product();
  p.name = typeof options.name === 'string' ? options.name : rand();
  p.measure = typeof options.measure === 'string' ? options.measure : 'ml';
  p.calories = typeof options.calories === 'number' ? options.calories : 100;
  return p.save();
}

async function addUser(options: IOptions): Promise<User> {
  const password = options.password || rand();
  const hash = await bcrypt.hash(password, 10);
  const u = new User();
  u.email =
    typeof options.email === 'string'
      ? options.email
      : `${rand()}@${rand()}.com`;
  u.password = hash;
  u.active = typeof options.active === 'boolean' ? options.active : true;
  return u.save();
}

export default create;
