import Immutable from 'immutable';

export default {
  slicer: (paths) => (state) =>
    paths ? state.filter((v, k) => paths.indexOf(k) > -1) : state,
  serialize: (subset) => JSON.stringify(subset.toJSON()),
  deserialize: (serializedData) => Immutable.fromJS(JSON.parse(serializedData)),
  merge: (initialState, persistedState) =>
    initialState.mergeDeep(persistedState),
};
