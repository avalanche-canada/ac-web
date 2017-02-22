import {Sponsor} from 'components/misc'
import {sponsor} from 'containers/connectors'
import {compose, branch, renderNothing} from 'recompose'

export default compose(
    sponsor,
    branch(
        props => !props.url,
        renderNothing,
    ),
)(Sponsor)
