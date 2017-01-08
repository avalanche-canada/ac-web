import React from 'react'
import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Page, Content, Header, Main, Section} from 'components/page'
import {Loading, Error} from 'components/misc'
import {Responsive, Table, Row, TBody, Header as TableHeader, HeaderCell, Cell} from 'components/table'
import {Pagination} from 'components/pagination'
import {loadIncidents} from 'actions/entities'
import mapStateToProps from 'selectors/incidents/table'
import Button from 'components/button'
import {DropdownFromOptions} from 'components/controls'
import {Form, Fieldset} from 'components/form'
import {replace} from 'utils/router'

const PARAMS = {
    season: [],
    province: [],
    activity: [],
    involvement: [],
}

function setParams(name, props) {
    return value => replace({
        query: {
            [name]: [...value]
        }
    }, props)
}

function paramsToArrays(params) {
    return Object.keys(params).reduce((values, key) => {
        const value = params[key]

        values[key] = Array.isArray(value) ? value : [value]

        return values
    }, {})
}

// TODO: Better usage a recompose

function IncidentsTable({
    incidents = [],
    pagination,
    isFetching,
    isError,
    isLoaded,
    messages,
    load,
    involementOptions,
    seasonOptions,
    provinceOptions,
    activityOptions,
    location,
    router,
}) {
    const {page, ...params} = Object.assign({}, PARAMS, location.query)
    const {season, province, involvement, activity} = paramsToArrays(params)
    const props = {
        router,
        location
    }

    return (
        <Page>
            <Header title='Avalanche Incident Reports' />
            <Content>
                <Main>
                    {isLoaded && (
                        <Form>
                            <Fieldset>
                                <DropdownFromOptions multiple value={new Set(involvement)} options={involementOptions} onChange={setParams('involvement', props)} placeholder='Type of involvement' />
                                <DropdownFromOptions multiple value={new Set(season)} options={seasonOptions} onChange={setParams('season', props)} placeholder='Season' />
                                <DropdownFromOptions multiple value={new Set(province)} options={provinceOptions} onChange={setParams('province', props)} placeholder='Province' />
                                <DropdownFromOptions multiple value={new Set(activity)} options={activityOptions} onChange={setParams('activity', props)} placeholder='Activity' />
                            </Fieldset>
                        </Form>
                    )}
                    {isLoaded &&
                    <Responsive>
                        <Table hoverable>
                            <TableHeader>
                                <Row clickable>
                                    <HeaderCell>Date</HeaderCell>
                                    <HeaderCell>Location</HeaderCell>
                                    <HeaderCell>Province</HeaderCell>
                                    <HeaderCell>Activity</HeaderCell>
                                    <HeaderCell>Involvement</HeaderCell>
                                    <HeaderCell>Injury</HeaderCell>
                                    <HeaderCell>Fatality</HeaderCell>
                                </Row>
                            </TableHeader>
                            <TBody>
                                {incidents.map(incident => (
                                    <Row key={incident.id} onClick={event => router.push(`/incidents/${incident.slug}`)}>
                                        <Cell>{incident.date === null ? 'N/A' : incident.date}</Cell>
                                        <Cell>{incident.location === null ? 'N/A' : incident.location}</Cell>
                                        <Cell>{incident.province === null ? 'N/A' : incident.province}</Cell>
                                        <Cell>{incident.activity === null ? 'N/A' : incident.activity}</Cell>
                                        <Cell>{incident.involvement === null ? 'N/A' : incident.involvement}</Cell>
                                        <Cell>{incident.injury === null ? 'N/A' : incident.injury}</Cell>
                                        <Cell>{incident.fatality === null ? 'N/A' : incident.fatality}</Cell>
                                    </Row>
                                ))}
                            </TBody>
                        </Table>
                    </Responsive>
                    }
                    {isFetching && <Loading>{messages.loading}</Loading>}
                    {isError && <Error>{messages.error}</Error>}
                    {pagination && <Pagination {...pagination} location={location} />}
                    {isError &&
                        <div>
                            <Button onClick={load}>
                                Try to reload
                            </Button>
                        </div>
                    }
                </Main>
            </Content>
        </Page>
    )
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        load: loadIncidents,
    }),
    lifecycle({
        componentDidMount() {
            const {load, location: {query}} = this.props

            load(query)
        },
        componentWillReceiveProps({load, location: {query, key}}) {
            if (key === this.props.location.key) {
                return
            }

            load(query)
        },
    }),
)(IncidentsTable)
