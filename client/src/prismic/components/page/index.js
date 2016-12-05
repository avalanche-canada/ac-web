import React, {Component, PropTypes, createElement} from 'react'
import {compose, lifecycle, branch, renderComponent, setPropTypes, setDisplayName, withProps, mapProps, flattenProp, defaultProps} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForUid} from 'actions/prismic'
import {Loading, WorkInProgress} from 'components/page'
import factory from 'prismic/factory'
import {getDocumentForUid} from 'getters/prismic'
import {classify} from 'utils/string'
import StaticPage from './StaticPage'
import Generic from './Generic'
import Simple from './Simple'

const mapStateToProps = createSelector(
    (state, {type, uid}) => getDocumentForUid(state, type, uid),
    (state, {message, title}) => ({message, title}),
    (document, props) => {
        if (document) {
            return {
                ...props,
                isLoading: false,
                ...factory.getType(document),
            }
        }

        return {
            ...props,
            isLoading: true
        }
    }
)

function withPrismic(BaseComponent) {
    return compose(
        setDisplayName('Prismic'),
        setPropTypes({
            type: PropTypes.string.isRequired,
            uid: PropTypes.string.isRequired,
            title: PropTypes.string,
            message: PropTypes.string,
        }),
        connect(mapStateToProps, {
            loadForUid
        }),
        lifecycle({
            componentDidMount() {
                const {loadForUid, type, uid} = this.props

                loadForUid(type, uid)
            },
        }),
        branch(
            props => props.isLoading,
            renderComponent(Loading),
            // TODO: Remove with recompose newest release. Thrid argument default to identity
            Component => Component,
        ),
    )(BaseComponent)
}

export function staticPage(uid, title, message) {
    return compose(
        withProps({
            type: 'static-page',
            uid,
            title,
            message,
        }),
        withPrismic,
    )(StaticPage)
}

// TODO: Rename to somthing more obvious
// Used for the Avalanche Canada Foundation Home Page
export function simple(uid) {
    return compose(
        withProps({
            type: 'static-page',
            uid,
        }),
        withPrismic,
    )(Simple)
}

export function generic(uid, title) {
    return compose(
        withProps({
            type: 'generic',
            uid,
            title,
        }),
        withPrismic,
    )(Generic)
}

function Page({component, ...props}) {
    return createElement(component, props)
}

const Components = new Map([
    ['static-page', StaticPage],
    ['generic', Generic],
])

export const FallbackPage = compose(
    defaultProps({
        title: 'Loading...'
    }),
    flattenProp('params'),
    withProps(({type}) => ({
        component: Components.get(type)
    })),
    withPrismic,
)(Page)

export function wip(uid, name, oldUrl, title, subtitle) {
    return defaultProps({
        uid,
        name,
        oldUrl,
        title,
        subtitle,
    })(WorkInProgress)
}
