/**
 * Created by saionara1 on 6/29/17.
 */
import * as actions from "../actions/action-types";

export default function loginReducer(state, action = {}) {
    switch (action.type) {
        case actions.ACTION_LIST_ERROR:
            return state.withMutations(state => state.set('loginError', action.error));
        case actions.ACTION_LIST_SUCCESS:
            const data = action.page === 1 ? action.list : state.get('data').concat(action.list);
            return state.withMutations(state => state.set('data', data));
        default:
            return state

    }
}