import { combineReducers } from 'redux-immutable';
import initalLoad from './initialLoad';
import detail from './detail';
export default combineReducers({ initalLoad, detail });
