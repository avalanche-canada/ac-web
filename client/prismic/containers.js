import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import formatDate from 'date-fns/format'
import startOfTomorrow from 'date-fns/start_of_tomorrow'
import startOfYesterday from 'date-fns/start_of_yesterday'
import { load } from 'actions/prismic'
import {
    getDocumentFromParams,
    getDocumentsFromParams,
    getResult,
} from 'getters/prismic'
import Status from 'utils/status'
import { GENERIC, STATIC_PAGE, APPLICATION_FEATURE } from 'constants/prismic'
import { parse } from 'prismic'
import * as Predicates from 'vendor/prismic/predicates'

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

const DocumentContainer = connect(
    createStructuredSelector({
        data(state, { params }) {
            return {
                document: getDocumentFromParams(state, params),
                status: Status.createFromResultSet(getResult(state, params)),
            }
        },
    }),
    { load }
)(Loader)

const DocumentsContainer = connect(
    createStructuredSelector({
        data(state, { params }) {
            return {
                documents: getDocumentsFromParams(state, params),
                status: Status.createFromResultSet(getResult(state, params)),
            }
        },
    }),
    { load }
)(Loader)

export class Document extends PureComponent {
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
        return (
            <DocumentContainer params={this.params}>
                {this.props.children}
            </DocumentContainer>
        )
    }
}

export class DocumentsOfType extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    get params() {
        return {
            predicates: [Predicates.type(this.props.type)],
        }
    }
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.props.children}
            </DocumentsContainer>
        )
    }
}

Generic.propTypes = {
    uid: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Generic({ uid, children }) {
    return (
        <Document type={GENERIC} uid={uid}>
            {children}
        </Document>
    )
}

StaticPage.propTypes = {
    uid: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function StaticPage({ uid, children }) {
    return (
        <Document type={STATIC_PAGE} uid={uid}>
            {children}
        </Document>
    )
}

export class Tutorial extends PureComponent {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    get params() {
        const { slug } = this.props

        return {
            predicates: [Predicates.field('tutorial-page', 'slug', slug)],
        }
    }
    render() {
        return (
            <DocumentContainer params={this.params}>
                {this.props.children}
            </DocumentContainer>
        )
    }
}

export function ApplicationFeature({ children }) {
    const params = {
        predicates: [
            Predicates.type(APPLICATION_FEATURE),
            Predicates.dateBefore(
                `my.${APPLICATION_FEATURE}.startDate`,
                formatDate(startOfTomorrow(), 'YYYY-MM-DD')
            ),
            Predicates.dateAfter(
                `my.${APPLICATION_FEATURE}.endDate`,
                formatDate(startOfYesterday(), 'YYYY-MM-DD')
            ),
        ],
    }

    return (
        <DocumentContainer params={params}>
            {({ document }) => children(document ? parse(document) : null)}
        </DocumentContainer>
    )
}
