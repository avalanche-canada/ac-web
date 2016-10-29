import React, {PropTypes} from 'react'
import {List} from 'immutable'
import moment from 'moment'
import {compose} from 'recompose'
import {Responsive, Table, Header, Row, Cell, HeaderCell, TBody, Caption} from 'components/table'

StationTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    measurements: PropTypes.instanceOf(List).isRequired,
    caption: PropTypes.string,
}

function measurementGrouper({measurementDateTime}) {
    return moment(measurementDateTime).format('MMMM Do YYYY')
}

export default function StationTable({columns, measurements, headers, caption}) {
    const bodies = measurements.groupBy(measurementGrouper)

    return (
        <Responsive>
            <Table>
                <Header>
                    {headers.map(headers => (
                        <Row>
                            {headers.map(({title, name, property, ...header}, index) => (
                                <HeaderCell key={index}  {...header}>
                                {typeof title === 'function' ? title() : title}
                                </HeaderCell>
                            ))}
                        </Row>
                    ))}
                </Header>
                {bodies.map((measurements, title) => (
                    <TBody title={title} featured>
                    {measurements.map(measurement => (
                        <Row key={measurement.id}>
                        {columns.map(({property, name}, index) => (
                            <Cell key={index}>
                            {typeof property === 'function' ? property(measurement) : measurement[property]}
                            </Cell>
                        ))}
                        </Row>
                    ))}
                    </TBody>
                ))}
                <Caption>{caption}</Caption>
            </Table>
        </Responsive>
    )
}
