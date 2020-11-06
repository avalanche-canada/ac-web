import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { setUTCOffset } from 'utils/date'
import css from './Table.css'
import table from 'styles/table.css'
import { useIntl } from 'react-intl'

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
    const intl = useIntl()
    const bodies = measurements.reduce((groups, measurements) => {
        const { measurementDateTime, utcOffset } = measurements
        const date = setUTCOffset(measurementDateTime, utcOffset)
        const title = intl.formatDate(date, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        if (!(title in groups)) {
            groups[title] = []
        }

        groups[title].push(measurements)

        return groups
    }, {})

    return (
        <div className={css.Container}>
            <div className={css.Content}>
                <table className={classnames(table.Condensed, table.Bordered)}>
                    <thead>
                        {headers.map((headers, index) => (
                            <tr key={index}>
                                <th />
                                {headers.map(
                                    ({ title, name, property, ...header }) => (
                                        <th key={name} {...header}>
                                            {typeof title === 'function'
                                                ? title()
                                                : title}
                                        </th>
                                    )
                                )}
                            </tr>
                        ))}
                    </thead>
                    {Object.entries(bodies).map(([title, measurements]) => (
                        <tbody key={title}>
                            <tr>
                                <th colSpan={columns.length}>{title}</th>
                            </tr>
                            {measurements.map((measurement, index) => (
                                <tr key={index}>
                                    {columns.map(renderRow, measurement)}
                                </tr>
                            ))}
                        </tbody>
                    ))}
                    <caption>{caption}</caption>
                </table>
            </div>
        </div>
    )
}

// Utils
function renderRow({ property, name, ...props }, index) {
    if (index === 0) {
        return (
            <th key={name}>
                {typeof property === 'function'
                    ? property(this)
                    : this[property]}
            </th>
        )
    }

    return (
        <td key={name} {...props}>
            {typeof property === 'function' ? property(this) : this[property]}
        </td>
    )
}
