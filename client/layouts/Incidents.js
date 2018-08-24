import React, { PureComponent } from 'react'
import { Page, Main, Content, Header } from 'components/page'
import * as c from 'components/incidents'
import format from 'date-fns/format'
import { getById, get } from 'services/fetch/incidents'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const ERROR = 'ERROR'

class IncidentDetailsContainer extends PureComponent {
    state = {
        status: {},
    }

    componentDidMount() {
        this.setState({
            status: PENDING,
        })

        getById(this.props.id)
            .then(data => {
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

        const { filters, page } = this.state
        const params = Object.assign({ page }, filters)

        if (params.from) {
            params.from = seasonToFrom(params.from)
        }
        if (params.to) {
            params.to = seasonToTo(params.to)
        }

        get(params)
            .then(data => {
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
