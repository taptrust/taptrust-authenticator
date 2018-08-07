/**
 * Created by saionara1 on 6/29/17.
 */
import * as actions from "../actions/action-types";

export default function rootReducer(state, action = {}) {
  switch (action.type) {
    case actions.PROGRESS:
      return state.set('progress', action.progress);
    default:
      return state
  }
}
