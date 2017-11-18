import { onlyUpdateForKeys, shouldUpdate } from 'recompose'

export Element from './Element'

export const neverUpdate = shouldUpdate(() => false)

export function onlyUpdateForKey(key) {
    return onlyUpdateForKeys([key])
}
