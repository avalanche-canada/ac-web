import {compose, branch, renderNothing} from 'recompose'
import {Sponsor} from '~/components/misc'
import {sponsor} from '~/containers/connectors'

export default compose(
    sponsor,
    branch(
        props => !props.url,
        renderNothing,
    ),
)(Sponsor)
