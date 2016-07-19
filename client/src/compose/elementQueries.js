import {lifecycle} from 'recompose'
import {init} from 'css-element-queries/src/ElementQueries'

export default function elementQueries() {
    return BaseComponent => {
        return lifecycle({
            componentDidMount: init,
            componentDidUpdate: init,
        })(BaseComponent)
    }
}
