import ActionTypes from '../constants/ActionTypes';
import { Record, Map, fromJS, List } from 'immutable';

const InitialState = Record({
  isFetching: false,
  cities: new Map(),
  removeList: new List(),
  favorites: new List(),
});

export default function initalLoad(state = new InitialState(), action) {
  switch (action.type) {
    case ActionTypes.INITIAL_LOAD:
      return state.set('isFetching', true);
    case ActionTypes.ADD_CITY_TO_STORE:
      return state.setIn(['cities', action.data.city], fromJS(action.data));
    case ActionTypes.REMOVE_CITY_FROM_LIST:
      return state
        .set('removeList', state.get('removeList').push(action.data))
        .set(
          'favorites',
          state.get('favorites').includes(action.data)
            ? state
                .get('favorites')
                .delete(state.get('favorites').indexOf(action.data))
            : state.get('favorites'),
        );
    case ActionTypes.ADD_REMOVE_FAVORITE_CITY:
      return state.set(
        'favorites',
        state.get('favorites').includes(action.data)
          ? state
              .get('favorites')
              .delete(state.get('favorites').indexOf(action.data))
          : state.get('favorites').push(action.data),
      );
    default:
      return state;
  }
}
