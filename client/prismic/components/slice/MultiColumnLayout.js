import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './MultiColumnLayout.css'
import { StructuredText } from '~/prismic/components/base'
import { parseGroup } from '~/prismic/parsers'

function createItem({ content }, index) {
    return <StructuredText key={index} value={content} />
}

MultiColumnLayout.propTypes = {
    // TODO: Create appropriate propType
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
}

function MultiColumnLayout(props) {
    return (
        <div styleName="ColumnSet">
            {parseGroup(props).map(createItem)}
        </div>
    )
}

export default CSSModules(MultiColumnLayout, styles)
