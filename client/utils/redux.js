import noop from 'lodash/noop'

export function createOptimisticAction(tester, action = noop) {
    return payload => (dispatch, getState) => {
        if (tester(getState(), payload)) {
            return dispatch(action(payload))
        }
    }
}
