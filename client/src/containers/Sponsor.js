import {compose, lifecycle} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import mapStateToProps from 'selectors/getSponsor'
import {Sponsor} from 'components/misc'
import {loadForType, loadForBookmark} from 'actions/prismic'

export default compose(
    withRouter,
    connect(mapStateToProps, {
        loadForType,
        loadForBookmark,
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForType('sponsor')
            this.props.loadForBookmark('sponsors')
        }
    }),
)(Sponsor)
