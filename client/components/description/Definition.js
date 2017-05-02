import { withProps } from 'recompose'
import Child from './Child'

export default withProps({
    styleName: 'Definition',
    component: 'dd',
})(Child)
