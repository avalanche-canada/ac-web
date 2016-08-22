import {compose, setDisplayName, withProps, branch, renderNothing, renderComponent} from 'recompose'
import Section from './Section'

export default compose(
    setDisplayName('Comment'),
    withProps({
        title: 'Comments'
    }),
    branch(
        props => !props.children,
        renderNothing,
        Component => Component,
    ),
)(Section)
