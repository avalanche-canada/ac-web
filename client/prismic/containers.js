import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import formatDate from 'date-fns/format'
import startOfTomorrow from 'date-fns/start_of_tomorrow'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import startOfMonth from 'date-fns/start_of_month'
import endOfMonth from 'date-fns/end_of_month'
import isToday from 'date-fns/is_today'
import startOfDay from 'date-fns/start_of_day'
import { load, loadForUid } from 'actions/prismic'
import * as Api from 'prismic/Api'
import {
    getDocumentFromParams,
    getDocumentsFromParams,
    getResult,
    getDocumentForUid,
    hasDocumentForUid,
} from 'getters/prismic'
import { parse } from 'prismic'
import Status from 'utils/status'
import * as Predicates from 'vendor/prismic/predicates'
import {
    GENERIC,
    STATIC_PAGE,
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

function mapDispatchToPropsFromUid(dispatch) {
    return {
        didMount({ props }) {
            const { type, uid } = props

            dispatch(loadForUid(type, uid))
        },
        willReceiveProps({ nextProps }) {
            const { type, uid } = nextProps

            dispatch(loadForUid(type, uid))
        },
    }
}

function mapDispatchToPropsFromParams(dispatch) {
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

function getSingleDocumentFromParams(state, { params, messages }) {
    const result = getResult(state, params)

    return {
        document: getDocumentFromParams(state, params),
        status: result.asStatus(messages).toObject(),
        metadata: result.toMetadata(),
    }
}

const mapStateToPropsFromParams = createStructuredSelector({
    data: getSingleDocumentFromParams,
})

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
    mapDispatchToPropsFromParams
)(Connector)

const DocumentContainer = connect(
    mapStateToPropsFromParams,
    mapDispatchToPropsFromParams
)(Connector)

const DocumentForUid = connect(
    createStructuredSelector({
        data(state, props) {
            const { type, uid, messages = {} } = props

            if (hasDocumentForUid(state, type, uid)) {
                const status = new Status({ messages })
                const document = getDocumentForUid(state, type, uid)

                return {
                    document,
                    status: status.fulfill().toObject(),
                    metadata: {
                        ids: new Set([document.id]),
                    },
                }
            } else {
                return getSingleDocumentFromParams(state, {
                    messages,
                    params: {
                        predicates: [Predicates.uid(type, uid)],
                    },
                })
            }
        },
    }),
    mapDispatchToPropsFromUid
)(Connector)

export class Document extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        uid: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        parse: PropTypes.bool,
    }
    children = data =>
        this.props.children({
            ...data,
            document: data.document ? parse(data.document) : undefined,
        })
    render() {
        const { parse, children, ...props } = this.props

        return (
            <DocumentForUid {...props}>
                {parse ? this.children : children}
            </DocumentForUid>
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

export class Generic extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    children = props =>
        this.props.children({
            ...props,
            document: props.document ? parse(props.document) : undefined,
        })
    render() {
        return (
            <Document type={GENERIC} uid={this.props.uid}>
                {this.children}
            </Document>
        )
    }
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
    children = props =>
        this.props.children({
            ...props,
            document: props.document ? parse(props.document) : undefined,
        })
    render() {
        return (
            <DocumentContainer params={this.params}>
                {this.children}
            </DocumentContainer>
        )
    }
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
const MONTHS = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
]

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

class Feed extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED_TYPES).isRequired,
        predicates: PropTypes.array,
        ordering: PropTypes.array,
        page: PropTypes.number,
        pageSize: PropTypes.number,
        children: PropTypes.func.isRequired,
        messages: PropTypes.object,
    }
    static defaultProps = {
        predicates: [],
        page: 1,
        pageSize: 10,
    }
    get params() {
        const { type, page, pageSize, predicates, ordering } = this.props

        if (predicates.length === 0) {
            predicates.push(Predicates.type(type))
        }

        return {
            predicates,
            options: {
                page,
                pageSize,
                orderings: ordering ? [ordering] : [FEED_ORDERINGS.get(type)],
            },
        }
    }
    createMessages({ status, documents }) {
        const { type } = this.props
        const isEmpty = status.isLoaded && documents.length === 0

        return {
            isLoaded: isEmpty && `No ${type} match your criteria.`,
            isLoading: `Loading ${type} feed...`,
            isError: `An error happened while loading the ${type} feed.`,
        }
    }
    renderChildren = data =>
        this.props.children({
            ...data,
            status: {
                ...data.status,
                messages: this.createMessages(data),
            },
            documents: prepareFeedDocuments(data.documents),
        })
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {this.renderChildren}
            </DocumentsContainer>
        )
    }
}

export class BlogPostFeed extends Component {
    static propTypes = {
        year: PropTypes.number,
        month: PropTypes.oneOf(MONTHS),
        category: PropTypes.oneOf([
            'forecaster blog',
            'north-rockies',
            'south-rockies',
            'yukon',
        ]),
        page: PropTypes.number,
        children: PropTypes.func.isRequired,
    }
    render() {
        const { year, month, category, children, ...props } = this.props
        const predicates = []

        if (year) {
            predicates.push(Predicates.year(`my.${BLOG}.date`, year))
        }

        if (month) {
            predicates.push(Predicates.month(`my.${BLOG}.date`, month))
        }

        if (category) {
            predicates.push(Predicates.at(`my.${BLOG}.category`, category))
        }

        return (
            <Feed type={BLOG} {...props} predicates={predicates}>
                {children}
            </Feed>
        )
    }
}

export class NewsFeed extends Component {
    static propTypes = {
        year: PropTypes.number,
        month: PropTypes.oneOf(MONTHS),
        tags: PropTypes.arrayOf(PropTypes.string),
        page: PropTypes.number,
        children: PropTypes.func.isRequired,
    }
    render() {
        const { year, month, tags, page } = this.props
        const predicates = []

        if (year) {
            predicates.push(Predicates.year(`my.${NEWS}.date`, year))
        }

        if (month) {
            predicates.push(Predicates.month(`my.${NEWS}.date`, month))
        }

        if (tags.size) {
            predicates.push(Predicates.tags(Array.from(tags)))
        }

        return (
            <Feed type={NEWS} page={page} predicates={predicates}>
                {this.props.children}
            </Feed>
        )
    }
}

export class EventFeed extends Component {
    static propTypes = {
        past: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.string),
        page: PropTypes.number,
        children: PropTypes.func.isRequired,
    }
    render() {
        const { past, tags, page } = this.props
        const ordering = past
            ? `${FEED_ORDERINGS.get(EVENT)} desc`
            : FEED_ORDERINGS.get(EVENT)
        const predicate = past ? Predicates.dateBefore : Predicates.dateAfter
        const predicates = []
        const timestamp = startOfDay(new Date()).getTime()

        predicates.push(predicate(`my.${EVENT}.end_date`, timestamp))

        if (tags.size) {
            predicates.push(Predicates.tags(Array.from(tags)))
        }

        return (
            <Feed
                type={EVENT}
                page={page}
                predicates={predicates}
                ordering={ordering}>
                {this.props.children}
            </Feed>
        )
    }
}

function prepareFeedDocuments(documents) {
    documents = documents.map(document => parse(document))

    // Bringing the first featured one on top!
    if (documents.some(isFeaturedPost)) {
        const featured = documents.find(isFeaturedPost)

        documents = documents.filter(post => featured !== post)

        documents.unshift(featured)
    }

    return documents
}

export class Tags extends Component {
    static propTypes = {
        type: PropTypes.oneOf(FEED_TYPES).isRequired,
        children: PropTypes.func.isRequired,
    }
    state = {}
    query = () => {
        const { type } = this.props

        Api.tags(type).then(tags =>
            this.setState({
                [type]: tags,
            })
        )
    }
    componentWillMount() {
        const { type } = this.props

        if (type in this.state) {
            return
        }

        this.setState(
            {
                [type]: new Set(),
            },
            this.query
        )
    }
    render() {
        return this.props.children(this.state[this.props.type])
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
            predicates.push(Predicates.tags(Array.from(tags)))
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
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {parseDocumentsAndRenderChildren.bind(this)}
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
    render() {
        return (
            <DocumentsContainer params={this.params}>
                {parseDocumentsAndRenderChildren.bind(this)}
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
function parseDocumentsAndRenderChildren(props) {
    return this.props.children({
        ...props,
        documents: props.documents.map(document => parse(document)),
    })
}
