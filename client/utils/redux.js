import noop from 'lodash/noop'

export function createOptimisticAction(tester, action = noop) {
    return payload => (dispatch, getState) => {
        if (tester(getState(), payload)) {
            return dispatch(action(payload))
        }
    }
}

export function createBinaryAction(tester, pass = noop, fail = noop) {
    return payload => (dispatch, getState) => {
        const action = tester(getState(), payload) ? pass : fail

        return dispatch(action(payload))
    }
}
