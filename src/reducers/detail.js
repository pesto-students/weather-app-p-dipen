import ActionTypes from '../constants/ActionTypes';
import { Record, Map, fromJS } from 'immutable';

const InitialState = Record({
  city: new Map(),
  loader: false,
  error: null,
  userLocationCity: new Map(),
});

export default function detail(state = new InitialState(), action) {
  switch (action.type) {
    case ActionTypes.SET_DETAIL_CITY:
      return state
        .set('city', fromJS(action.data))
        .set('loader', false)
        .set('error', null);
    case ActionTypes.LOAD_DETAIL_CITY:
      return state
        .set('loader', true)
        .set('city', new Map())
        .set('error', null);
    case ActionTypes.LOAD_DETAIL_CITY_ERROR:
      return state
        .set('loader', false)
        .set('city', new Map())
        .set('error', action.error);
    case ActionTypes.SET_CURRENT_LOCATION_DETAIL_CITY:
      return state.set('userLocationCity', fromJS(action.data));
    default:
      return state;
  }
}
