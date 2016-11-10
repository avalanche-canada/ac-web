import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {List} from 'immutable'
import moment from 'moment'
import {compose} from 'recompose'
import {Responsive, Table, Header, Row, Cell, HeaderCell, TBody, Caption} from 'components/table'
import styles from './Table.css'

StationTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    measurements: PropTypes.instanceOf(List),
    caption: PropTypes.string,
}

function measurementGrouper({measurementDateTime}) {
    return moment(measurementDateTime).format('dddd MMMM Do, YYYY')
}

function renderRow({property, name, ...props}, index) {
    if (index === 0) {
        return (
            <HeaderCell>
                {typeof property === 'function' ? property(this) : this[property]}
            </HeaderCell>
        )
    }

    return (
        <Cell key={index} {...props}>
            {typeof property === 'function' ? property(this) : this[property]}
        </Cell>
    )
}

function StationTable({columns, measurements, headers, caption}) {
    const bodies = measurements.groupBy(measurementGrouper)

    return (
        <div styleName='Container'>
            <div styleName='Content'>
                <Table condensed>
                    <Header>
                        {headers.map(headers => (
                        <Row>
                            <HeaderCell></HeaderCell>
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
                                {columns.map(renderRow, measurement)}
                            </Row>
                        ))}
                        </TBody>
                    ))}
                    <Caption>{caption}</Caption>
                </Table>
            </div>
        </div>
    )
}

export default compose(
    CSSModules(styles)
)(StationTable)
