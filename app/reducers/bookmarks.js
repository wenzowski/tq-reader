import {Map as iMap} from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = iMap({
  data: iMap()
});

const actionsMap = {
  [ActionTypes.ADD_BOOKMARK](state, action) {
    return state.setIn(['data', action.article.uri.spec], action.article);
  },
  [ActionTypes.DELETE_BOOKMARK](state, action) {
    return state.deleteIn(['data', action.uri]);
  }
};

export default function bookmarks(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
