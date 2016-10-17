import {lifecycle} from 'recompose'
import {init} from 'css-element-queries/src/ElementQueries'

////////////////////////////////////////////////////////////////////////////////
// Please use one or two times per pages, not hundred times on a page!
// It slows down page rendering.
// Always favor media queries over element queries.
////////////////////////////////////////////////////////////////////////////////

export default function elementQueries() {
    return BaseComponent => {
        return lifecycle({
            componentDidMount() {
                init()
            },
            componentDidUpdate() {
                init()
            },
        })(BaseComponent)
    }
}
