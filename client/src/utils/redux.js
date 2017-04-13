import noop from 'lodash/noop'

export function createOptimisticAction(getter, value, action = noop) {
    return payload => (dispatch, getState) => {
        if (getter(getState(), payload) === value) {
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
