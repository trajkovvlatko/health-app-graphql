import dotenv from 'dotenv';
import {createConnection, getConnection, getManager} from 'typeorm';
import GlucoseLevel from './entity/GlucoseLevel';
import User from './entity/User';

const env = process.env.NODE_ENV || 'dev';
dotenv.config({path: `.env.${env}`});

const rand = (max: number) => Math.floor(Math.random() * Math.floor(max));

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

const addUser = async (i: number): Promise<User> => {
  const user = new User();
  user.email = `email-${i}@host.com`;
  user.password = `password-${i}`;
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
  glucoseLevel.level = rand(10);
  glucoseLevel.userId = userId;
  glucoseLevel.createdAt = date;
  await glucoseLevel.save();
  return glucoseLevel;
};

const addGlucoseLevels = async (userId: number): Promise<GlucoseLevel[]> => {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
  const dates = datesBetweenDates(oneMonthAgo, today);
  return Promise.all(dates.map((date: Date) => addGlucoseLevel(userId, date)));
};

const clearTables = async (): Promise<void> => {
  const manager = getManager();
  await manager.query('TRUNCATE TABLE "user", "glucose_level" CASCADE;');
};

(async function () {
  try {
    getConnection();
  } catch (e) {
    await createConnection();
  }

  await clearTables();

  const users = await addUsers();
  return Promise.all(users.map((user: User) => addGlucoseLevels(user.id)));
})();
