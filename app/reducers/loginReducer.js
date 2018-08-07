/**
 * 
 */
import * as actions from "../actions/action-types";

export default function loginReducer(state, action = {}) {
  switch (action.type) {
    case actions.LOGIN_ERROR:
      return state.withMutations(state => state
        .set('isLoggedIn', false)
        .set('progress', false)
        .set('loginError', action.error));
    case actions.LOGIN_SUCCESS:
      return state.withMutations(state => state
        .set('isLoggedIn', true)
        .set('progress', false)
        .set('authorizationId', action.token.id)
        .set('username', action.username)
        .set('password', action.password)
        .set('token', action.token.token));
    case actions.LOGOUT_SUCCESS: {
      return state.withMutations(state => state
        .set('progress', false)
        .set('isLoggedIn', false)
        .set('token', '')
        .set('authorizationId', '')
        .set('username', '')
        .set('username', '')
        .set('password', ''));
    }
    case actions.LOGOUT_ERROR: {
      return state.withMutations(state => state
        .set('progress', false)
        .set('isLoggedIn', false)
        .set('loginError', action.err));
    }
    default:
      return state
  }
}