import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import { DATE, setUTCOffset } from 'utils/date'
import {
    Table,
    Header,
    Row,
    Cell,
    HeaderCell,
    TBody,
    Caption,
} from 'components/table'
import styles from './Table.css'

StationTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    measurements: PropTypes.arrayOf(PropTypes.object),
    caption: PropTypes.string,
}

export default function StationTable({
    columns,
    measurements,
    headers,
    caption,
}) {
    const bodies = measurements.reduce((groups, measurements) => {
        const { measurementDateTime, utcOffset } = measurements
        const title = format(setUTCOffset(measurementDateTime, utcOffset), DATE)

        if (!(title in groups)) {
            groups[title] = []
        }

        groups[title].push(measurements)

        return groups
    }, {})

    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <Table condensed>
                    <Header>
                        {headers.map((headers, index) => (
                            <Row key={index}>
                                <HeaderCell />
                                {headers.map(
                                    ({ title, name, property, ...header }) => (
                                        <HeaderCell key={name} {...header}>
                                            {typeof title === 'function'
                                                ? title()
                                                : title}
                                        </HeaderCell>
                                    )
                                )}
                            </Row>
                        ))}
                    </Header>
                    {Object.entries(bodies).map(([title, measurements]) => (
                        <TBody key={title} title={title} featured>
                            {measurements.map((measurement, index) => (
                                <Row key={index}>
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

// Utils
function renderRow({ property, name, ...props }, index) {
    if (index === 0) {
        return (
            <HeaderCell key={name}>
                {typeof property === 'function'
                    ? property(this)
                    : this[property]}
            </HeaderCell>
        )
    }

    return (
        <Cell key={name} {...props}>
            {typeof property === 'function' ? property(this) : this[property]}
        </Cell>
    )
}
