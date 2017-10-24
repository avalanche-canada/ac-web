import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { load } from 'actions/prismic'
import { getDocumentFromParams, getResult } from 'getters/prismic'
import { GENERIC, STATIC_PAGE } from 'constants/prismic'
import * as Predicates from 'vendor/prismic/predicates'
import * as Pages from 'prismic/components/page'

class Loader extends PureComponent {
    static propTypes = {
        children: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
        load: PropTypes.func.isRequired,
        data: PropTypes.object,
    }
    load() {
        this.props.load(this.props.params)
    }
    componentDidMount() {
        this.load()
    }
    componentDidUpdate() {
        this.load()
    }
    render() {
        const { children, data } = this.props

        return children(data)
    }
}

const Container = connect(
    createStructuredSelector({
        data(state, { params }) {
            return {
                document: getDocumentFromParams(state, params),
                status: getResult(state, params),
            }
        },
    }),
    { load }
)(Loader)

class Document extends PureComponent {
    static propTypes = {
        children: PropTypes.func.isRequired,
        uid: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }
    get params() {
        const { type, uid } = this.props

        return {
            predicates: [Predicates.type(type), Predicates.uid(type, uid)],
        }
    }
    render() {
        return <Container params={this.params}>{this.props.children}</Container>
    }
}

Generic.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function Generic({ uid, title }) {
    return (
        <Document type={GENERIC} uid={uid}>
            {props => <Pages.Generic title={title} {...props} />}
        </Document>
    )
}

StaticPage.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export function StaticPage({ uid, title }) {
    return (
        <Document type={STATIC_PAGE} uid={uid}>
            {props => <Pages.StaticPage title={title} {...props} />}
        </Document>
    )
}
