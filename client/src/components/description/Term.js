import {withProps} from 'recompose'
import Child from './Child'

export default withProps({
    styleName: 'Term',
    component: 'dt',
})(Child)
