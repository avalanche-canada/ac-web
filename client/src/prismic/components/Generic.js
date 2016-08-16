import React, {Component, PropTypes} from 'react'
import {compose, lifecycle, mapProps, flattenProp, branch, renderComponent, setDisplayName, setPropTypes, renameProp} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForBookmark} from 'actions/prismic'
import {Loading, InnerHTML} from 'components/misc'
import factory from 'prismic/types/factory'
import {getDocumentForBookmark} from 'reducers/prismic'

const mapStateToProps = createSelector(
    (state, {bookmark}) => getDocumentForBookmark(state, bookmark),
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
        bookmark: PropTypes.string.isRequired,
        message: PropTypes.string,
    }),
    connect(mapStateToProps, {
        loadForBookmark
    }),
    lifecycle({
        componentDidMount() {
            const {loadForBookmark, bookmark} = this.props

            loadForBookmark(bookmark)
        }
    }),
    branch(
        props => props.isLoading,
        renderComponent(renameProp('message', 'children')(Loading)),
        // TODO: Remove with recompose newest release. Thrid argument default to identity
        Component => Component,
    ),
    flattenProp('props'),
    renameProp('body', 'children'),
)(InnerHTML)
