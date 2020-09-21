import dotenv from 'dotenv';
import {createConnection, getConnection, getManager} from 'typeorm';
import GlucoseLevel from './entity/GlucoseLevel';
import User from './entity/User';
import bcrypt from 'bcrypt';
import Weight from './entity/Weight';
import Meal from './entity/Meal';
import MealType from './entity/MealType';
import Product from './entity/Product';
import MealProduct from './entity/MealProduct';
import ExerciseType from './entity/ExerciseType';
import Exercise from './entity/Exercise';

const env = process.env.NODE_ENV || 'dev';
dotenv.config({path: `.env.${env}`});

const rand = (min = 1, max = 100000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const datesBetweenDates = (startDate: Date, endDate: Date) => {
  let dates = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

const dateRange = () => {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
  return {oneMonthAgo, today};
};

const addUser = async (i: number): Promise<User> => {
  const user = new User();
  user.email = `email-${i}@host.com`;
  user.password = await bcrypt.hash(`password-${i}`, 10);
  await user.save();
  return user;
};

const addUsers = async (): Promise<User[]> => {
  const count = Array.from(Array(5).keys());
  return Promise.all(count.map(addUser));
};

const addGlucoseLevel = async (
  userId: number,
  date: Date,
): Promise<GlucoseLevel> => {
  const glucoseLevel = new GlucoseLevel();
  glucoseLevel.level = rand(1, 10);
  glucoseLevel.userId = userId;
  glucoseLevel.createdAt = date;
  await glucoseLevel.save();
  return glucoseLevel;
};

const addGlucoseLevels = async (userId: number): Promise<GlucoseLevel[]> => {
  const {oneMonthAgo, today} = dateRange();
  const dates = datesBetweenDates(oneMonthAgo, today);
  return Promise.all(dates.map((date: Date) => addGlucoseLevel(userId, date)));
};

const addWeight = async (userId: number, date: Date): Promise<Weight> => {
  const w = new Weight();
  w.userId = userId;
  w.weight = rand(50, 100);
  w.measure = 'kg';
  w.createdAt = date;
  await w.save();
  return w;
};

const addWeights = async (userId: number): Promise<Weight[]> => {
  const {oneMonthAgo, today} = dateRange();
  const dates = datesBetweenDates(oneMonthAgo, today);
  return Promise.all(dates.map((date: Date) => addWeight(userId, date)));
};

const addMealTypes = async () => {
  return ['breakfast', 'lunch', 'dinner', 'snack'].map(async (name: string) => {
    const mealType = new MealType();
    mealType.name = name;
    await mealType.save();
    return mealType;
  });
};

const addExerciseTypes = async () => {
  return ['running', 'swimming', 'cycling', 'climbing'].map(
    async (name: string) => {
      const exerciseType = new ExerciseType();
      exerciseType.name = name;
      exerciseType.calories = rand(100, 1000);
      exerciseType.image = `images/${name}.jpg`;
      await exerciseType.save();
      return exerciseType;
    },
  );
};

const addProducts = async () => {
  const products = [
    {name: 'milk', measure: 'l'},
    {name: 'bread', measure: 'g'},
    {name: 'cheese', measure: 'g'},
    {name: 'chips', measure: 'g'},
    {name: 'soup', measure: 'ml'},
    {name: 'potato', measure: 'pieces'},
    {name: 'meat', measure: 'g'},
  ];

  return products.map(async (p: {name: string; measure: string}) => {
    const product = new Product();
    product.name = p.name;
    product.measure = p.measure;
    product.calories = rand(100, 900);
    await product.save();
    return product;
  });
};

const addMeal = async (
  userId: number,
  date: Date,
  products: Product[],
  mealTypes: MealType[],
) => {
  const meal = new Meal();
  meal.userId = userId;
  meal.createdAt = date;
  meal.mealType = mealTypes[rand(0, mealTypes.length)];
  await meal.save();

  const mealProduct = new MealProduct();
  mealProduct.meal = meal;
  mealProduct.product = products[rand(0, products.length)];
  mealProduct.amount = rand(1, 6);
  await mealProduct.save();

  return meal;
};

const addMeals = async (userId: number): Promise<Meal[]> => {
  const {oneMonthAgo, today} = dateRange();
  const dates = datesBetweenDates(oneMonthAgo, today);
  const products = await Product.find();
  const mealTypes = await MealType.find();
  return Promise.all(
    dates.map((date: Date) => addMeal(userId, date, products, mealTypes)),
  );
};

const addExercise = async (
  userId: number,
  date: Date,
  exerciseTypes: ExerciseType[],
) => {
  const exercise = new Exercise();
  exercise.userId = userId;
  exercise.createdAt = date;
  exercise.duration = rand(30, 150);
  exercise.intensity = rand(1, 6);
  exercise.exerciseType = exerciseTypes[rand(0, exerciseTypes.length)];
  await exercise.save();
  return exercise;
};

const addExercises = async (userId: number): Promise<Exercise[]> => {
  const {oneMonthAgo, today} = dateRange();
  const dates = datesBetweenDates(oneMonthAgo, today);
  const exerciseTypes = await ExerciseType.find();
  return Promise.all(
    dates.map((date: Date) => addExercise(userId, date, exerciseTypes)),
  );
};

const clearTables = async (): Promise<void> => {
  const manager = getManager();
  await manager.query(
    'TRUNCATE TABLE "user", "product", "meal_type", "meal", "meal_product", "glucose_level", "weight", "exercise_type", "exercise" CASCADE;',
  );
};

(async function () {
  try {
    getConnection();
  } catch (e) {
    await createConnection();
  }

  await clearTables();

  await addMealTypes();
  await addProducts();
  await addExerciseTypes();

  const users = await addUsers();
  users.map(async (user: User) => addMeals(user.id));
  users.map((user: User) => addGlucoseLevels(user.id));
  users.map((user: User) => addWeights(user.id));
  users.map((user: User) => addExercises(user.id));
})();
