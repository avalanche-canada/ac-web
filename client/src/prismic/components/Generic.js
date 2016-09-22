import React, {Component, PropTypes} from 'react'
import {compose, lifecycle, mapProps, flattenProp, branch, renderComponent, setDisplayName, setPropTypes, renameProp} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForParams} from 'actions/prismic'
import {Loading, InnerHTML} from 'components/misc'
import factory from 'prismic/types/factory'
import {getDocumentForParams} from 'reducers/prismic'

const mapStateToProps = createSelector(
    (state, {loadForParams, message, ...params}) => getDocumentForParams(state, params),
    document => {
        if (!document) {
            return {
                isLoading: true
            }
        }

        return {
            isLoading: false,
            props: {...factory.getType(document)},
        }
    }
)

export default compose(
    setDisplayName('Generic'),
    setPropTypes({
        uid: PropTypes.string,
        id: PropTypes.string,
        message: PropTypes.string,
    }),
    connect(mapStateToProps, {
        loadForParams,
    }),
    lifecycle({
        componentDidMount() {
            const {loadForParams, message, uid, id} = this.props

            loadForParams({
                type: 'generic',
                uid,
                id,
            })
        }
    }),
    branch(
        props => props.isLoading,
        renderComponent(mapProps(({message}) => ({children: message}))(Loading)),
        // TODO: Remove with recompose newest release. Thrid argument default to identity
        Component => Component,
    ),
    mapProps(({props}) => ({
        children: props.body
    }))
)(InnerHTML)
