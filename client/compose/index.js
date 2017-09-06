import { compose, lifecycle, onlyUpdateForKeys, shouldUpdate } from 'recompose'
import { withRouter } from 'react-router-dom'
import { scrollPosition } from '~/utils/dom'

export Element from './Element'
export fullscreen from './fullscreen'

export const neverUpdate = shouldUpdate(() => false)

export function onlyUpdateForKey(key) {
    return onlyUpdateForKeys([key])
}

export const withHash = compose(
    withRouter,
    lifecycle({
        componentDidMount() {
            const { hash } = this.props.location

            if (hash && this.props.hash && hash === `#${this.props.hash}`) {
                const position = scrollPosition(hash)

                if (position) {
                    window.scrollTo(...position)
                }
            }
        },
    })
)
