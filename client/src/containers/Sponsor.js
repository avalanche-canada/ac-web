import {compose, lifecycle} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import mapStateToProps from 'selectors/getSponsor'
import {Sponsor} from 'components/misc'
import {loadForType} from 'actions/prismic'

export default compose(
    withRouter,
    connect(mapStateToProps, {
        loadForType,
    }),
    lifecycle({
        componentDidMount() {
            const {loadForType} = this.props

            loadForType('sponsor')
        }
    }),
)(Sponsor)
