import React, {PropTypes} from 'react'
import {compose, lifecycle, setDisplayName} from 'recompose'
import {connect} from 'react-redux'
import {Loading, Error} from 'components/misc'
import {withRouter} from 'react-router'
import {loadIncidents} from 'actions/entities'
import mapStateToProps from 'selectors/incidents/details'
import {Metadata, Entry} from 'components/metadata'
import {Page, Header, Main, Section} from 'components/page'
import {TabSet, Tab} from 'components/tab'
import {Table, Row, TBody, Header as TableHeader, HeaderCell, Cell} from 'components/table'
import {List} from 'components/description'
import {asTermAndDefinition} from 'components/description/utils'
import {DateElement, Mailto, Muted, GoBack} from 'components/misc'

const {keys} = Object

function Incident({
    router,
    title,
    isError,
    isLoading,
    isLoaded,
    documents = [],
    snowpack,
    weather,
    avalanches = [],
    summary = {},
    metadata = {},
}) {
    const subject = `More information on incident "${title}"`

    return (
        <Page>
            <Header title={title}>
                <GoBack>Back to incidents</GoBack>
            </Header>
            <Main>
                <Metadata>
                    <Entry term='Date'>
                        <DateElement value={metadata.date} />
                    </Entry>
                    <Entry term='Location'>{metadata.location}</Entry>
                </Metadata>
                <Section>
                    <TabSet>
                        <Tab title='Summary'>
                            <List>
                                {asTermAndDefinition(summary)}
                            </List>
                        </Tab>
                        <Tab title='Avalanche'>
                            {avalanches.length === 0 ?
                                <Muted>No avalanche information available.</Muted> :
                                <Table>
                                    <TableHeader>
                                        <Row>
                                            <HeaderCell>Date/time</HeaderCell>
                                            <HeaderCell>Size</HeaderCell>
                                            <HeaderCell>Type</HeaderCell>
                                            <HeaderCell>Trigger</HeaderCell>
                                            <HeaderCell>Elevation</HeaderCell>
                                            <HeaderCell>Aspect</HeaderCell>
                                            <HeaderCell>Slab width</HeaderCell>
                                            <HeaderCell>Slab thickness</HeaderCell>
                                        </Row>
                                    </TableHeader>
                                    {avalanches.map(({date, size, type, trigger, elevation, aspect, slabWidth, slabThickness}) => (
                                        <Row>
                                            <Cell>{date}</Cell>
                                            <Cell>{size}</Cell>
                                            <Cell>{type}</Cell>
                                            <Cell>{trigger}</Cell>
                                            <Cell>{elevation}</Cell>
                                            <Cell>{aspect}</Cell>
                                            <Cell>{slabWidth}</Cell>
                                            <Cell>{slabThickness}</Cell>
                                        </Row>
                                    ))}
                                </Table>
                            }
                        </Tab>
                        <Tab title='Weather'>
                            <h2>Weather</h2>
                            {weather ?
                                <List>{asTermAndDefinition(weather)}</List> :
                                <Muted>No weather information available.</Muted>
                            }
                            <h2>Snowpack</h2>
                            {snowpack ?
                                <List>{asTermAndDefinition(snowpack)}</List> :
                                <Muted>No snowpack information available.</Muted>
                            }
                        </Tab>
                        <Tab title='Documents'>
                            {documents.length === 0 ?
                                <Muted>No documents are available.</Muted> :
                                <Table>
                                    <TableHeader>
                                        <Row>
                                            <HeaderCell>Date</HeaderCell>
                                            <HeaderCell>Title</HeaderCell>
                                            <HeaderCell>Source</HeaderCell>
                                        </Row>
                                    </TableHeader>
                                    <TBody>
                                        {documents.map(({date, title, source, ...file}) => (
                                            <Row>
                                                <Cell>
                                                    <DateElement value={date} />
                                                </Cell>
                                                <Cell>
                                                    <a {...file}>{title}</a>
                                                </Cell>
                                                <Cell>{source}</Cell>
                                            </Row>
                                        ))}
                                    </TBody>
                                </Table>
                            }
                        </Tab>
                    </TabSet>
                </Section>
                <Section>
                    We are interested in more information on this incident. Please contact us using this <Mailto subject={subject}>feedback link</Mailto>.
                </Section>
            </Main>
        </Page>
    )
}

export default compose(
    connect(mapStateToProps, {
        load: loadIncidents,
    }),
    withRouter,
    lifecycle({
        componentDidMount() {
            const {load, params} = this.props

            load(params)
        },
        componentWillReceiveProps({load, params, location}) {
            if (location.key === this.props.location.key) {
                return
            }

            load(params)
        }
    }),
)(Incident)
