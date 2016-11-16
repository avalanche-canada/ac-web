import {compose, branch, withState, lifecycle, onlyUpdateForKeys, shouldUpdate, renderNothing} from 'recompose'
import {scrollPosition} from 'utils/dom'

export Element from './Element'

export elementQueries from './elementQueries'

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

export function wait(delay = 0) {
    let timeoutId

    return compose(
        withState('visible', 'setVisible', false),
        lifecycle({
            componentWillMount() {
                timeoutId = setTimeout(() => {
                    this.props.setVisible(true)
                }, delay)
            },
            componentWillUnmount() {
                clearTimeout(timeoutId)
            },
        }),
        branch(
            props => props.visible,
            Component => Component,
            renderNothing,
        )
    )
}
