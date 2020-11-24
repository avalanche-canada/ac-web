import React from 'react'
import PropTypes from 'prop-types'
import styles from './MultiColumnLayout.module.css'
import { StructuredText } from 'prismic/components/base'

// TODO Look if we really need that slice
// Component still needed would benefit of creating a Grid component instead.

MultiColumnLayout.propTypes = {
    // TODO: Create appropriate propType
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default function MultiColumnLayout({ value }) {
    return <div className={styles.ColumnSet}>{value.map(createItem)}</div>
}

// Utils
function createItem({ content }, index) {
    return (
        <div key={index}>
            <StructuredText value={content} />
        </div>
    )
}
