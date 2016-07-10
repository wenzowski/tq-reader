import {combineReducers} from 'redux-immutablejs';
import bookmarks from './bookmarks';

const currentReducers = {
  bookmarks
};

export default combineReducers(currentReducers);
