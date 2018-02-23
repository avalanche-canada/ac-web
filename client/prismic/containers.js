import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import formatDate from 'date-fns/format'
import startOfTomorrow from 'date-fns/start_of_tomorrow'
import startOfYesterday from 'date-fns/start_of_yesterday'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import startOfMonth from 'date-fns/start_of_month'
import endOfMonth from 'date-fns/end_of_month'
import isToday from 'date-fns/is_today'
import { load } from 'actions/prismic'
import {
    getDocumentFromParams,
    getDocumentsFromParams,
    getResult,
} from 'getters/prismic'
import { parse } from 'prismic'
import * as Predicates from 'vendor/prismic/predicates'
import {
    GENERIC,
    STATIC_PAGE,
    APPLICATION_FEATURE,
    NEWS,
    EVENT,
    BLOG,
    SPECIAL_INFORMATION,
    FATAL_ACCIDENT,
    TOYOTA_TRUCK_REPORT,
    HOTZONE_REPORT,
    SPAW as SPAW_TYPE,
    WEATHER_FORECAST,
    HIGHLIGHT,
} from 'constants/prismic'
import SponsorsMetadata from 'containers/SponsorsMetadata'
import Connector from 'containers/Connector'
import { DATE } from 'utils/date'
import * as utils from 'utils/search'

function mapDispatchToProps(dispatch) {
    return {
        didMount({ props }) {
            dispatch(load(props.params))
        },
        willReceiveProps({ props, nextProps }) {
            if (props.params !== nextProps.params) {
                dispatch(load(nextProps.params))
            }
        },
    }
}

export const DocumentsContainer = connect(
    createStructuredSelector({
        data(state, { params, messages }) {
            const result = getResult(state, params)

            return {
                documents: getDocumentsFromParams(state, params),
                status: result.asStatus(messages).toObject(),
                metadata: result.toMetadata(),
            }
        },
    }),
    mapDispatchToProps
)(Connector)

const DocumentContainer = connect(
    createStructuredSelector({
        data(state, { params, messages }) {
            // TODO: More work here to test if document already exists
            const result = getResult(state, params)

            return {
                document: getDocumentFromParams(state, params),
                status: result.asStatus(messages).toObject(),
                metadata: result.toMetadata(),
            }
        },
    }),
    mapDispatchToProps
)(Connector)

export class Document extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        uid: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        parse: PropTypes.bool,
    }
    get params() {
        const { type, uid } = this.props

        return {
            predicates: [Predicates.type(type), Predicates.uid(type, uid)],
        }
    }
    children = ({ status, document }) =>
        this.props.children({
            status,
            document: document ? parse(document) : undefined,
        })
    render() {
        return (
            <DocumentContainer params={this.params}>
                {this.props.parse ? this.children : this.props.children}
            </DocumentContainer>
        )
    }
}

export class DocumentsOfType extends Component {
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

export class Tutorial extends Component {
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
                utils.formatDate(startOfTomorrow())
            ),
            Predicates.dateAfter(
                `my.${APPLICATION_FEATURE}.endDate`,
                utils.formatDate(startOfYesterday())
            ),
        ],
    }

    return (
        <DocumentContainer params={params}>
            {({ document }) => children(document ? parse(document) : null)}
        </DocumentContainer>
    )
}

export class DocumentsById extends Component {
    static propTypes = {
        ids: PropTypes.arrayOf(PropTypes.string).isRequired,
        children: PropTypes.func.isRequired,
    }
    get params() {
        const { ids } = this.props

        return {
            predicates: [Predicates.in('document.id', ids)],
            options: {
                pageSize: ids.length,
            },
        }
    }
    children = ({ documents, ...rest }) => {
        return this.props.children({
            ...rest,
            documents: documents.filter(Boolean).map(parse),
        })
    }
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.children}
            </DocumentsContainer>
        )
    }
}

export class WeatherForecast extends Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date),
        children: PropTypes.func.isRequired,
    }
    get messages() {
        const date = formatDate(this.props.date, DATE)

        return {
            isLoading: `Loading weather forecast for ${date}...`,
            isError: `Error happened to load weather forecast for ${date}.`,
        }
    }
    get params() {
        const { date } = this.props

        if (date && !isToday(date)) {
            return {
                predicates: [
                    Predicates.field(
                        WEATHER_FORECAST,
                        'date',
                        utils.formatDate(date)
                    ),
                ],
            }
        } else {
            return {
                predicates: [
                    Predicates.type(WEATHER_FORECAST),
                    Predicates.dateBefore(
                        `my.${WEATHER_FORECAST}.date`,
                        startOfTomorrow()
                    ),
                ],
                options: {
                    pageSize: 1,
                    orderings: [`my.${WEATHER_FORECAST}.date desc`],
                },
            }
        }
    }
    children = ({ status, document }) =>
        this.props.children({
            status,
            forecast: data(document),
        })
    render() {
        return (
            <DocumentContainer params={this.params} messages={this.messages}>
                {this.children}
            </DocumentContainer>
        )
    }
}

export class WeatherTutorial extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    static messages = {
        isLoading: 'Loading tutorial...',
        isError: 'Error happened while loading tutorial...',
    }
    render() {
        return (
            <Document
                type="weather-forecast-tutorial"
                uid={this.props.uid}
                parse
                messages={WeatherTutorial.messages}>
                {this.props.children}
            </Document>
        )
    }
}

const FEED_TYPES = [NEWS, BLOG, EVENT]
const FEED_ORDERINGS = new Map([
    [NEWS, `my.${NEWS}.date desc`],
    [BLOG, `my.${BLOG}.date desc`],
    [EVENT, `my.${EVENT}.start_date`],
])

export class Post extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED_TYPES).isRequired,
        uid: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        const { type, uid } = this.props

        return (
            <Document parse type={type} uid={uid}>
                {this.props.children}
            </Document>
        )
    }
}

export class Feed extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED_TYPES).isRequired,
        children: PropTypes.func.isRequired,
    }
    get params() {
        const { type } = this.props

        return {
            predicates: [Predicates.type(type)],
            options: {
                pageSize: 250,
                orderings: [FEED_ORDERINGS.get(type)],
            },
        }
    }
    children = ({ documents, status }) => {
        documents = documents.map(document => parse(document))

        // Bringing the first featured one on top!
        if (documents.some(isFeaturedPost)) {
            const featured = documents.find(isFeaturedPost)

            documents = documents.filter(post => featured !== post)

            documents.unshift(featured)
        }

        return this.props.children({ status, documents })
    }
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.children}
            </DocumentsContainer>
        )
    }
}

export class FeedSplash extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED_TYPES).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        children: PropTypes.func.isRequired,
    }
    get params() {
        const { type, tags } = this.props
        const predicates = [Predicates.type(type)]

        if (Array.isArray(tags) && tags.length > 0) {
            predicates.push(Predicates.tags(tags))
        }

        if (type === EVENT) {
            predicates.push(
                Predicates.dateAfter(
                    `my.${EVENT}.start_date`,
                    utils.formatDate(new Date())
                )
            )
        }

        return {
            predicates,
            options: {
                pageSize: 5,
                orderings: [FEED_ORDERINGS.get(type)],
            },
        }
    }
    // TODO: Reuse that function
    children = ({ documents, status }) =>
        this.props.children({
            status,
            documents: documents.map(document => parse(document)),
        })
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.children}
            </DocumentsContainer>
        )
    }
}

export class FeedSidebar extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED_TYPES).isRequired,
        uid: PropTypes.string,
        children: PropTypes.func.isRequired,
    }
    get params() {
        const { type } = this.props
        const predicates = [Predicates.type(type)]
        let ordering
        // TODO: Reuse a bit of the functions from FeedSplash container
        if (type === EVENT) {
            predicates.push(
                Predicates.dateAfter(
                    'my.event.start_date',
                    utils.formatDate(startOfTomorrow())
                )
            )
            ordering = 'my.event.start_date'
        } else {
            predicates.push(Predicates.tags('featured'))
            ordering = `my.${type}.date desc`
        }

        return {
            predicates,
            options: {
                pageSize: 7,
                orderings: [ordering],
            },
        }
    }
    children = ({ documents, status }) =>
        this.props.children({
            status,
            documents: documents
                .filter(d => d.uid !== this.props.uid)
                .map(document => parse(document)),
        })
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.children}
            </DocumentsContainer>
        )
    }
}

export class Sponsor extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    sponsors = ({ props: { data } }) => {
        if (Object.keys(data).keys().length === 0) {
            return this.props.children({
                status: {
                    isLoading: true,
                },
            })
        }

        const { name } = this.props
        const uid = data[name] || name

        return (
            <Document parse type="sponsor" uid={uid}>
                {this.props.children}
            </Document>
        )
    }
    render() {
        return <SponsorsMetadata>{this.sponsors}</SponsorsMetadata>
    }
}

export class SpecialInformation extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Document parse type={SPECIAL_INFORMATION} uid={this.props.id}>
                {this.props.children}
            </Document>
        )
    }
}

export class FatalAccident extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Document parse type={FATAL_ACCIDENT} uid={this.props.id}>
                {this.props.children}
            </Document>
        )
    }
}

export class ToyotaTruckReport extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Document parse type={TOYOTA_TRUCK_REPORT} uid={this.props.id}>
                {this.props.children}
            </Document>
        )
    }
}

export class HotZoneReport extends Component {
    static propTypes = {
        region: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        children: PropTypes.func.isRequired,
    }
    get messages() {
        const { region } = this.props

        return {
            isLoading: `Loading ${region} hot zone report...`,
            isError: `Error happened while loading ${region} hot zone report.`,
        }
    }
    get params() {
        return {
            predicates: [
                Predicates.field(HOTZONE_REPORT, 'region', this.props.region),
                ...rangePredicates(
                    `my.${HOTZONE_REPORT}.dateOfIssue`,
                    `my.${HOTZONE_REPORT}.validUntil`,
                    this.props.date
                ),
            ],
            options: {
                pageSize: 1,
                orderings: [`my.${HOTZONE_REPORT}.dateOfIssue desc`],
            },
        }
    }
    children = ({ document, status }) =>
        this.props.children({
            status,
            report: document
                ? parse(document)
                : status.isLoaded ? null : undefined,
        })
    render() {
        return (
            <DocumentContainer params={this.params} messages={this.messages}>
                {this.children}
            </DocumentContainer>
        )
    }
}

export class MonthlyHotZoneReportSet extends Component {
    static propTypes = {
        region: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        children: PropTypes.func.isRequired,
    }
    get params() {
        const { date, region } = this.props
        const start = utils.formatDate(startOfMonth(date))
        const end = utils.formatDate(endOfMonth(date))

        return {
            predicates: [
                Predicates.field(HOTZONE_REPORT, 'region', region),
                Predicates.dateBefore(`my.${HOTZONE_REPORT}.dateOfIssue`, end),
                Predicates.dateAfter(`my.${HOTZONE_REPORT}.validUntil`, start),
            ],
        }
    }
    children = ({ documents, status }) =>
        this.props.children({
            status,
            reports: documents.map(document => parse(document)),
        })
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.children}
            </DocumentsContainer>
        )
    }
}

export class SPAW extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    get params() {
        return {
            predicates: [
                Predicates.type(SPAW_TYPE),
                ...rangePredicates(
                    `my.${SPAW_TYPE}.start`,
                    `my.${SPAW_TYPE}.end`
                ),
            ],
        }
    }
    children = ({ document, status }) =>
        this.props.children({
            document: data(document),
            status,
        })
    render() {
        return (
            <DocumentContainer params={this.params}>
                {this.children}
            </DocumentContainer>
        )
    }
}

export class Highlight extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    get params() {
        return {
            predicates: [
                Predicates.type(HIGHLIGHT),
                ...rangePredicates(
                    `my.${HIGHLIGHT}.start`,
                    `my.${HIGHLIGHT}.end`
                ),
            ],
        }
    }
    children = ({ document, status }) =>
        this.props.children({
            document: data(document),
            status,
        })
    render() {
        return (
            <DocumentContainer params={this.params}>
                {this.children}
            </DocumentContainer>
        )
    }
}

// Utils function
function data(document) {
    return document ? parse(document).data : undefined
}
function isFeaturedPost({ featured }) {
    return featured
}
function rangePredicates(start, end, date = new Date()) {
    return [
        Predicates.dateBefore(start, utils.formatDate(addDays(date, 1))),
        Predicates.dateAfter(end, utils.formatDate(subDays(date, 1))),
    ]
}
