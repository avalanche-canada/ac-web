import {lifecycle} from 'recompose'
import {init} from 'css-element-queries/src/ElementQueries'

// TODO: We probably do not need that. It is slowwwwww

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
