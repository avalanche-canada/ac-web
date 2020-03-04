import React from 'react'
import PropTypes from 'prop-types'
import { Responsive } from 'components/table'
import { StructuredText } from 'prismic/components/base'
import styles from './Tabular.css'

Tabular.propTypes = {
    primary: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
}

export default function Tabular({ primary, items }) {
    const header = items.find(item => item.header === YES)
    const rows = items.filter(item => item !== header)
    const captionSide = primary.caption_position

    return (
        <Responsive>
            <table>
                {header && (
                    <thead>
                        <Row {...header} />
                    </thead>
                )}
                <tbody>
                    {rows.map((row, index) => (
                        <Row key={index} {...row} />
                    ))}
                </tbody>
                {Array.isArray(primary.caption) && primary.caption.length > 0 && (
                    <caption style={{ captionSide }} className={styles.Cell}>
                        <StructuredText value={primary.caption} />
                    </caption>
                )}
            </table>
        </Responsive>
    )
}

// Utils & Constants
function Row({
    header,
    column_1,
    column_2,
    column_3,
    column_4,
    column_5,
    column_6,
}) {
    const as = header === YES ? 'th' : 'td'

    return (
        <tr>
            <Cell as={as} value={column_1} />
            <Cell as={as} value={column_2} />
            <Cell as={as} value={column_3} />
            <Cell as={as} value={column_4} />
            <Cell as={as} value={column_5} />
            <Cell as={as} value={column_6} />
        </tr>
    )
}
function Cell({ as: As = 'td', value }) {
    if (Array.isArray(value) && value.length > 0) {
        return (
            <As className={styles.Cell}>
                <StructuredText value={value} />
            </As>
        )
    }

    return null
}
const YES = 'Yes'
