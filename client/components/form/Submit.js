import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'
import { ChevronRight } from '~/components/icons'
import Button from '../button'

Submit.propTypes = {
    children: PropTypes.string.isRequired,
}

function Submit({ children }) {
    return (
        <Button type="submit" styleName="Submit">
            {children} <ChevronRight inverse />
        </Button>
    )
}

export default CSSModules(Submit, styles)
