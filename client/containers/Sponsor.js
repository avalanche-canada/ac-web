import { compose, flattenProp, branch, renderNothing } from 'recompose'
import { Sponsor } from '~/components/misc'
import { sponsor } from '~/containers/connectors'

export default compose(
    sponsor,
    flattenProp('data'),
    branch(props => !props.url, renderNothing)
)(Sponsor)
