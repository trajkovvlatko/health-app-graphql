import {createStore} from '@reduxjs/toolkit';
import mealsReducer from 'redux/reducers/Root';

const store = createStore(mealsReducer);

export default store;
