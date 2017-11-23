import { onlyUpdateForKeys, shouldUpdate } from 'recompose'

export const neverUpdate = shouldUpdate(() => false)

export function onlyUpdateForKey(key) {
    return onlyUpdateForKeys([key])
}
