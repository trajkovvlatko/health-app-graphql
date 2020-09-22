import Meal from '../src/entity/Meal';
import MealType from '../src/entity/MealType';
import Product from '../src/entity/Product';
import User from '../src/entity/User';
import bcrypt from 'bcrypt';
import MealProduct from '../src/entity/MealProduct';
import {getConnection} from 'typeorm';
import Exercise from '../src/entity/Exercise';
import ExerciseType from '../src/entity/ExerciseType';
import GlucoseLevel from '../src/entity/GlucoseLevel';
import Weight from '../src/entity/Weight';

function rand() {
  return Math.random().toString(36).substring(7);
}

interface IOptions {
  [key: string]: string | boolean | number | Date;
}

async function create(table: 'meals', options: IOptions): Promise<Meal>;
async function create(
  table: 'glucose_levels',
  options: IOptions,
): Promise<GlucoseLevel>;
async function create(table: 'weights', options: IOptions): Promise<Weight>;
async function create(table: 'exercises', options: IOptions): Promise<Exercise>;
async function create(
  table: 'exercise_types',
  options: IOptions,
): Promise<ExerciseType>;
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
    case 'exercises':
      return await addExercise(options);
    case 'exercise_types':
      return await addExerciseType(options);
    case 'glucose_levels':
      return await addGlucoseLevel(options);
    case 'weights':
      return await addWeight(options);
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
  await meal.save();

  const product = await addProduct({});

  const mealProduct = new MealProduct();
  mealProduct.meal = meal;
  mealProduct.product = product;
  mealProduct.amount = 123;
  await mealProduct.save();

  return await getConnection()
    .getRepository(Meal)
    .createQueryBuilder('meal')
    .innerJoinAndSelect('meal.mealProducts', 'mealProducts')
    .innerJoinAndSelect('mealProducts.product', 'products')
    .innerJoinAndSelect('meal.mealType', 'mealType')
    .where({id: meal.id, userId: meal.userId})
    .getOne();
}

async function addMealType(options: IOptions): Promise<MealType> {
  const mealType = new MealType();
  mealType.name = typeof options.name === 'string' ? options.name : rand();
  mealType.active = typeof options.active === 'boolean' ? options.active : true;
  return await mealType.save();
}

async function addExercise(options: IOptions): Promise<Exercise> {
  const exercise = new Exercise();
  exercise.userId =
    typeof options.userId === 'number'
      ? options.userId
      : (await create('users', {})).id;
  exercise.exerciseTypeId =
    typeof options.exerciseTypeId === 'number'
      ? options.exerciseTypeId
      : (await create('exercise_types', {})).id;
  exercise.duration =
    typeof options.duration === 'number' ? options.duration : 15;
  exercise.intensity =
    typeof options.intensity === 'number' ? options.intensity : 3;
  await exercise.save();

  return getConnection()
    .getRepository(Exercise)
    .createQueryBuilder('exercise')
    .innerJoinAndSelect('exercise.exerciseType', 'exerciseType')
    .where({id: exercise.id, userId: exercise.userId})
    .getOne();
}

async function addExerciseType(options: IOptions): Promise<ExerciseType> {
  const exerciseType = new ExerciseType();
  exerciseType.name = typeof options.name === 'string' ? options.name : rand();
  exerciseType.image =
    typeof options.image === 'string' ? options.image : rand();
  exerciseType.calories =
    typeof options.calories === 'number' ? options.calories : 100;
  exerciseType.active =
    typeof options.active === 'boolean' ? options.active : true;
  return await exerciseType.save();
}

async function addProduct(options: IOptions): Promise<Product> {
  const p = new Product();
  p.name = typeof options.name === 'string' ? options.name : rand();
  p.measure = typeof options.measure === 'string' ? options.measure : 'ml';
  p.calories = typeof options.calories === 'number' ? options.calories : 100;
  p.userId = typeof options.userId === 'number' ? options.userId : null;
  p.active = typeof options.active === 'boolean' ? options.active : true;
  return await p.save();
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
  const user = await u.save();
  user.password = password ? password.toString() : '';
  return user;
}

async function addGlucoseLevel(options: IOptions): Promise<GlucoseLevel> {
  const glucoseLevel = new GlucoseLevel();
  glucoseLevel.level = typeof options.level === 'number' ? options.level : 100;
  glucoseLevel.userId =
    typeof options.userId === 'number'
      ? options.userId
      : (await create('users', {})).id;
  return await glucoseLevel.save();
}

async function addWeight(options: IOptions): Promise<Weight> {
  const w = new Weight();
  w.weight = typeof options.weight === 'number' ? options.weight : 65;
  w.measure = typeof options.measure === 'string' ? options.measure : 'kg';
  w.userId =
    typeof options.userId === 'number'
      ? options.userId
      : (await create('users', {})).id;
  return await w.save();
}

export default create;
