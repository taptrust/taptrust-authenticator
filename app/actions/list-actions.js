/**
 * Created by saionara1 on 7/21/17.
 */
import * as actions from "../actions/action-types";

export function setError(error) {
  return {
    type: actions.ACTION_LIST_ERROR,
    error: error
  }
}

export function getList(token, page, limit) {
  return {
    type: actions.ACTION_REPOSITORIES_LIST,
    token: token,
    page: page,
    limit: limit
  }
}

export function setListSuccess(list,page) {
  return {
    type: actions.ACTION_LIST_SUCCESS,
    list: list,
    page: page
  };
}