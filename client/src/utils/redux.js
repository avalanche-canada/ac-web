import noop from 'lodash/noop'
import {DelayPromise} from 'utils/promise'

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

export function createDelayedAction(delay = 1, action = noop) {
    return payload => (dispatch, getState) => {
        if (typeof delay === 'function') {
            delay = delay(getState(), payload)
        }

        return DelayPromise(delay).then(() => dispatch(action(payload)))
    }
}
