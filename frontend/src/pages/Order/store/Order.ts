import {createStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers/Root';

const store = createStore(rootReducer);

export default store;
