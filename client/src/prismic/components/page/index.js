import React, {Component, PropTypes, createElement} from 'react'
import {compose, lifecycle, branch, renderComponent, setPropTypes, setDisplayName, withProps} from 'recompose'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {loadForParams} from 'actions/prismic'
import {Loading} from 'components/page'
import factory from 'prismic/types/factory'
import {getDocumentForParams} from 'reducers/prismic'
import {classify} from 'utils/string'

const mapStateToProps = createSelector(
    (state, {params}) => getDocumentForParams(state, params),
    (state, {message, title}) => ({message, title}),
    (document, props) => {
        if (document) {
            return {
                ...props,
                isLoading: false,
                props: factory.getType(document),
                component: require(`./${classify(document.type)}`).default
            }
        }

        return {
            ...props,
            isLoading: true
        }
    }
)

function Page({component, props}) {
    return createElement(component, props)
}

export default compose(
    setDisplayName('Page'),
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
)(Page)
