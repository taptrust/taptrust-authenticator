/**
 * Created by saionara1 on 6/22/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";

function* authorize(username, password) {
  try {
    const token = yield call(Api.getAccessToken, username, password);
    if (!token.message) {
      yield put(loginActions.setLoginSuccess(token, username, password));
      return token;
    } else {
      yield put(loginActions.setError(token));
      return undefined;
    }
  } catch (error) {
    yield put(loginActions.setError(error));
  }
}

export function* loginFlow() {
  while (true) {
    const {username, password} = yield take(actions.LOGIN_ACTION);
    yield put(rootActions.controlProgress(true));
    yield call(authorize, username, password);
    yield put(rootActions.controlProgress(false));
  }
}


