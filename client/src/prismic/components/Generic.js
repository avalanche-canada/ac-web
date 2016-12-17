import React, {Component, PropTypes} from 'react'
import {compose, lifecycle, mapProps, flattenProp, branch, renderComponent, setDisplayName, setPropTypes, renameProp, defaultProps} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForUid} from 'actions/prismic'
import {Loading, InnerHTML} from 'components/misc'
import factory from 'prismic/factory'
import {getDocumentForUid} from 'getters/prismic'

const mapStateToProps = createSelector(
    (state, {type, uid}) => getDocumentForUid(state, type, uid),
    document => {
        if (!document) {
            return {
                isLoading: true
            }
        }

        return {
            isLoading: false,
            props: {
                ...factory.getType(document)
            },
        }
    }
)

export default compose(
    setDisplayName('Generic'),
    setPropTypes({
        uid: PropTypes.string,
        message: PropTypes.string,
    }),
    defaultProps({
        type: 'generic',
    }),
    connect(mapStateToProps, {
        loadForUid,
    }),
    lifecycle({
        componentDidMount() {
            const {loadForUid, uid, type} = this.props

            loadForUid(type, uid)
        }
    }),
    branch(
        props => props.isLoading,
        renderComponent(mapProps(({message}) => ({children: message}))(Loading)),
    ),
    mapProps(({props}) => ({
        children: props.body
    }))
)(InnerHTML)
