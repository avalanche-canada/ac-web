import {shouldUpdate, onlyUpdateForKeys} from 'recompose'

export Element from './Element'
export elementQueries from './elementQueries'
export const neverUpdate = shouldUpdate(() => false)
export function onlyUpdateForKey(key) {
    return onlyUpdateForKeys([key])
}
