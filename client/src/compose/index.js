import {lifecycle, onlyUpdateForKeys, shouldUpdate} from 'recompose'
import {scrollPosition} from '~/utils/dom'

export Element from './Element'

export const neverUpdate = shouldUpdate(() => false)

export function onlyUpdateForKey(key) {
    return onlyUpdateForKeys([key])
}

export const withHash = lifecycle({
    componentDidMount() {
        const {hash} = document.location

        if (hash && this.props.hash && hash === `#${this.props.hash}`) {
            const position = scrollPosition(hash)

            if (position) {
                window.scrollTo(...position)
            }
        }
    }
})
