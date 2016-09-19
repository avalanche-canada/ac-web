import {PropTypes} from 'react'
import {compose, flattenProp, branch, mapProps, lifecycle, setPropTypes, defaultProps, renderNothing, renderComponent} from 'recompose'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import mapStateToProps from 'selectors/sponsor'
import {Sponsor} from 'components/misc'
import {loadForUid} from 'actions/prismic'

export default compose(
    setPropTypes({
        uid: PropTypes.string,
    }),
    defaultProps({
        uid: null,
    }),
    connect(mapStateToProps, {
        loadForUid,
    }),
    lifecycle({
        componentDidMount() {
            const {loadForUid, uid} = this.props

            if (uid) {
                loadForUid('sponsor', uid)
            }
        },
        componentWillReceiveProps({uid, loadForUid}) {
            if (this.props.uid !== uid) {
                loadForUid('sponsor', uid)
            }
        },
    }),
    flattenProp('sponsor'),
    branch(
        props => props.uid === null,
        renderNothing,
        Component => Component,
    ),
)(Sponsor)
