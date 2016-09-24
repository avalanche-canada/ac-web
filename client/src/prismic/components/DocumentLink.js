import {PropTypes} from 'react'
import {Link} from 'react-router'
import {compose, withProps, setPropTypes, setDisplayName, withState, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {loadForUid} from 'actions/prismic'
import {getDocumentForUid} from 'reducers/prismic'
import {title, pathname} from 'utils/prismic'

function mapStateToProps(state, {type, uid}) {
    const document = getDocumentForUid(state, type, uid)

    if (document) {
        return {
            children: title(document)
        }
    }

    return {

    }
}

export default compose(
    setDisplayName('DocumentLink'),
    setPropTypes({
        type: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }),
    connect(mapStateToProps, {
        loadForUid
    }),
    lifecycle({
        componentDidMount() {
            const {type, uid, loadForUid} = this.props

            loadForUid(type, uid)
        },
    }),
    withProps(props => ({
        to: pathname(props),
    }))
)(Link)
