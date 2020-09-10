import {createStore} from '@reduxjs/toolkit';
import reducers from 'redux/reducers/Root';

const store = createStore(reducers);

export default store;
