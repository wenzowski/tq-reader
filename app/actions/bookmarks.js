import * as types from '../constants/ActionTypes';

export function addBookmark(article) {
  return {type: types.ADD_BOOKMARK, article};
}

export function deleteBookmark(uri) {
  return {type: types.DELETE_BOOKMARK, uri};
}
