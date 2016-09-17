import React, {Component, PropTypes, createElement} from 'react'
import {compose, lifecycle, branch, renderComponent, setPropTypes, setDisplayName, withProps, mapProps} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForParams} from 'actions/prismic'
import {Loading} from 'components/page'
import factory from 'prismic/types/factory'
import {getDocumentForParams} from 'reducers/prismic'
import {classify} from 'utils/string'
import StaticPage from './StaticPage'
import Generic from './Generic'
import Simple from './Simple'

const mapStateToProps = createSelector(
    (state, {params}) => getDocumentForParams(state, params),
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

export function withPrismic(BaseComponent) {
    return compose(
        setDisplayName('Prismic'),
        setPropTypes({
            params: PropTypes.oneOf([
                PropTypes.shape({
                    id: PropTypes.string,
                }),
                PropTypes.shape({
                    bookmark: PropTypes.string,
                }),
                PropTypes.shape({
                    type: PropTypes.string,
                    uid: PropTypes.string,
                }),
            ]).isRequired,
            title: PropTypes.string,
            message: PropTypes.string,
        }),
        connect(mapStateToProps, {
            loadForParams
        }),
        lifecycle({
            componentDidMount() {
                const {loadForParams, params} = this.props

                loadForParams(params)
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
            params: {
                type: 'static-page',
                uid,
            },
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
            params: {
                type: 'static-page',
                uid,
            },
        }),
        withPrismic,
    )(Simple)
}

export function generic(bookmark, title) {
    return compose(
        withProps({
            params: {
                bookmark
            },
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
    withProps(({params: {type}}) => ({
        component: Components.get(type)
    })),
    withPrismic,
)(Page)
