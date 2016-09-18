import {compose, setDisplayName, defaultProps, branch, renderNothing} from 'recompose'
import Section from './Section'

export default compose(
    setDisplayName('Comment'),
    defaultProps({
        title: 'Comments'
    }),
    branch(
        props => !props.children,
        renderNothing,
        // TODO: Remove when new recompose release
        Component => Component,
    ),
)(Section)
