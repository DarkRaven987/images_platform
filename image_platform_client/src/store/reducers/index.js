import { combineReducers } from 'redux';
import userReducer from './user';
import imagesReducer from './images';

const reducers = combineReducers({
  user: userReducer,
  image: imagesReducer,
});

export default reducers;
