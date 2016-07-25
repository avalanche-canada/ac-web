import React, {Component, PropTypes, createElement} from 'react'
import {compose, withProps, lifecycle, branch, renderComponent, setPropTypes,} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForBookmark} from 'actions/prismic'
import {Loading} from 'components/page'
import factory from 'prismic/types/factory'
import {getDocumentForBookmark} from 'reducers/prismic'
import {classify} from 'utils/string'

const isLoading = {
    isLoading: true
}

function mapStateToPropsFactory(bookmark) {
    return createSelector(
        state => getDocumentForBookmark(state, bookmark),
        document => {
            if (document) {
                return {
                    isLoading: false,
                    props: {...factory.getType(document)},
                    component: require(`./${classify(document.type)}`).default
                }
            }

            return isLoading
        }
    )
}

function I(Component) {
    return Component
}

function Page({component, props}) {
    return createElement(component, props)
}

export default function prismic({bookmark, title, message}) {
    return compose(
        connect(mapStateToPropsFactory(bookmark), {loadForBookmark}),
        lifecycle({
            componentDidMount() {
                this.props.loadForBookmark(bookmark)
            }
        }),
        branch(
            props => props.isLoading,
            renderComponent(withProps({title, message})(Loading)),
            I,
        )
    )(Page)
}
