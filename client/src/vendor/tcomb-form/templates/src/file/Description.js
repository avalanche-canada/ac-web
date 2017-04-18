import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Button from '~/components/button'
import styles from './File.css'

Description.propTypes = {
    index: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
}

function Description({index, total, onRemoveClick}) {
    return (
        <div styleName='Description'>
            {index + 1} / {total}
            <Button type='button' onClick={onRemoveClick}>
                Remove
            </Button>
        </div>
    )
}

export default CSSModules(Description, styles)
