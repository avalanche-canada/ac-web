import React from 'react'
import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {Page, Header, Main, Section} from 'components/page'
import Forecast, {Metadata} from 'components/forecast'
import {Loading, Error} from 'components/misc'
import {Table, Row, TBody, Header as TableHeader, HeaderCell, Cell} from 'components/table'
import {Pagination} from 'components/pagination'
import {loadIncidents} from 'actions/entities'
import mapStateToProps from 'selectors/incidents'
import Button from 'components/button'
import {DropdownFromOptions} from 'components/controls'
import {Form, Fieldset} from 'components/form'

function Container({
    incidents = [],
    pagination,
    isFetching,
    isError,
    isLoaded,
    messages,
    load,
    typeOfInvolementOptions,
    seasonOptions,
    provinceOptions,
    activityOptions,
}) {
    return (
        <Page>
            <Header title='Avalanche Incident Reports' />
            <Main>
                {isLoaded ||
                    <Form>
                        <Fieldset>
                            <DropdownFromOptions multiple options={typeOfInvolementOptions} placeholder='Type of involvement' />
                            <DropdownFromOptions multiple options={seasonOptions} placeholder='Season' />
                            <DropdownFromOptions multiple options={provinceOptions} placeholder='Province' />
                            <DropdownFromOptions multiple options={activityOptions} placeholder='Activity' />
                        </Fieldset>
                    </Form>
                }
                {isLoaded ||
                    <Table>
                        <TableHeader>
                            <Row>
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
                            {incidents.map(incident => {
                                return (
                                    <Row>
                                        <Cell>{incident.date}</Cell>
                                        <Cell>{incident.location}</Cell>
                                        <Cell>{incident.province}</Cell>
                                        <Cell>{incident.activity}</Cell>
                                        <Cell>{incident.involvement}</Cell>
                                        <Cell>{incident.injury}</Cell>
                                        <Cell>{incident.fatality}</Cell>
                                    </Row>
                                )
                            })}
                        </TBody>
                    </Table>
                }
                {isFetching && <Loading>{messages.loading}</Loading>}
                {isError && <Error>{messages.error}</Error>}
                {pagination && <Pagination {...pagination} />}
                {isError &&
                    <div>
                        <Button onClick={load}>
                            Try to reload
                        </Button>
                    </div>
                }
            </Main>
        </Page>
    )
}

function setPage(page) {
    console.warn(page)
}

function setFilter(...args) {
    console.warn(...args)
}

function nextPage() {

}

function previousPage() {

}

export default compose(
    connect(mapStateToProps, {
        load: loadIncidents,
        setPage,
        setFilter,
        nextPage,
        previousPage,

    }),
    lifecycle({
        componentDidMount() {
            this.props.load()
        }
    }),
)(Container)
