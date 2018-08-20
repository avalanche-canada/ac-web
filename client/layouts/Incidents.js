import React, { PureComponent, Fragment } from 'react'
import axios from 'axios'
import { Page, Main, Content, Header, Headline, Aside } from 'components/page'
import * as c from 'components/incidents'
import format from 'date-fns/format'
import { incidentsBaseUrl } from 'api/config'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const ERROR = 'ERROR'

const BASE_URL = incidentsBaseUrl + '/public/incidents'

class IncidentDetailsContainer extends PureComponent {
    state = {
        status: {},
    }

    componentDidMount() {
        this.setState({
            status: PENDING,
        })

        axios
            .get(`${BASE_URL}/${this.props.id}/`)
            .then(({ data }) => {
                this.setState({
                    status: FULFILLED,
                    data,
                })
            })
            .catch(err => {
                this.setState({
                    status: ERROR,
                    error: err,
                })
            })
    }

    render() {
        return this.props.children(this.state)
    }
}

class IncidentListContainer extends PureComponent {
    state = {
        status: {},
        filters: {},
        page: 1,
    }

    componentDidMount() {
        this.loadData()
    }
    loadData() {
        this.setState({
            status: PENDING,
        })

        const opts = Object.assign(
            { page: this.state.page },
            this.state.filters
        )

        axios
            .get(`${BASE_URL}/?${toQS(opts)}`)
            .then(({ data }) => {
                this.setState({
                    status: FULFILLED,
                    data,
                })
            })
            .catch(err => {
                this.setState({
                    status: ERROR,
                    error: err,
                })
            })
    }

    pageChange = n => {
        this.setState(
            (prevState, props) => Object.assign(prevState, { page: n }),
            () => this.loadData()
        )
    }

    filterChange = f => {
        this.setState(
            (prevState, props) =>
                Object.assign(prevState, { filters: f, page: undefined }),
            () => this.loadData()
        )
    }

    render() {
        return this.props.children(
            this.state,
            this.pageChange,
            this.filterChange
        )
    }
}

/*
 * TODO(wnh): This is SOOOO gross. I feel dirty.
 */
const seasonToFrom = s => {
    if (s === 1980) {
        return '0001-01-01'
    } else {
        return format(new Date(s, 5, 1), 'YYYY-MM-DD')
    }
}
const seasonToTo = s => format(new Date(s + 1, 4, 30), 'YYYY-MM-DD')

function toQS(opts) {
    var pairs = []
    if (opts.page) {
        pairs.push('page=' + opts.page)
    }
    if (opts.from) {
        pairs.push('from=' + seasonToFrom(opts.from))
    }
    if (opts.to) {
        pairs.push('to=' + seasonToTo(opts.to))
    }
    return pairs.join('&')
}

export class IncidentsList extends PureComponent {
    render() {
        return (
            <Page>
                <Header title="Historical Incidents" />
                <Content>
                    <Main>
                        <IncidentListContainer>
                            {(props, pageChange, filterChange) => {
                                return (
                                    <c.IncidentList
                                        {...props}
                                        onPageChange={pageChange}
                                        onFilterChange={filterChange}
                                    />
                                )
                            }}
                        </IncidentListContainer>
                    </Main>
                </Content>
            </Page>
        )
    }
}

export class IncidentDetails extends PureComponent {
    render() {
        const id = this.props.match.params.id
        return (
            <Page>
                <Header title="Historical Incidents" />
                <Content>
                    <Main>
                        <IncidentDetailsContainer id={id}>
                            {({ status, data }) => (
                                <c.IncidentDetails
                                    status={status}
                                    data={data}
                                />
                            )}
                        </IncidentDetailsContainer>
                    </Main>
                </Content>
            </Page>
        )
    }
}
