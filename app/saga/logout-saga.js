/**
 * Created by ihor_kucherenko on 7/11/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as logoutActions from "../actions/logout-actions";
import * as rootActions from "../actions/root-actions";


function* logOut(authId, username, password) {
  try {
    const result = yield call(Api.logOut, authId, username, password);
    if (!result) {
      yield put(logoutActions.setLogoutSuccess());
    } else {
      yield put(logoutActions.setError(result)); 
    }
  } catch (error) {
    yield put(logoutActions.setError(error));
  }
}

export function* logoutFlow() {
  while (true) {
    const {username, password, authId} = yield take(actions.LOGOUT_ACTION);
    yield put(rootActions.controlProgress(true));
    yield call(logOut, authId, username, password);
    yield put(rootActions.controlProgress(false));
  }
}