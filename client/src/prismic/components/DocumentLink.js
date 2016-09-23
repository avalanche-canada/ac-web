import {PropTypes} from 'react'
import {Link} from 'react-router'
import {compose, withProps, setPropTypes, setDisplayName, withState, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {loadForUid} from 'actions/prismic'
import {getDocumentForUid} from 'reducers/prismic'

function mapStateToProps(state, {type, uid}) {
    const document = getDocumentForUid(state, type, uid)

    if (document) {
        return {
            children: document.data[`${type}.title`].value
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
    withProps(({type, uid}) => ({
        to: `/pages/${type}/${uid}`,
    }))
)(Link)
