import noop from 'lodash/noop'

export function createOptimisticAction(getter, value, action = noop) {
    return payload => (dispatch, getState) => {
        if (getter(getState()) === value) {
            return dispatch(action())
        }
    }
}

export function createBinaryAction(tester, pass = noop, fail = noop) {
    return payload => (dispatch, getState) => {
        const action = tester(getState()) ? pass : fail

        return dispatch(action())
    }
}
