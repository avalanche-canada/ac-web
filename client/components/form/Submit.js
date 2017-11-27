import React from 'react'
import PropTypes from 'prop-types'
import { ChevronRight } from 'components/icons'
import Button from '../button'
import styles from './Form.css'

Submit.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Submit({ children }) {
    return (
        <Button type="submit" className={styles.Submit}>
            {children} <ChevronRight inverse />
        </Button>
    )
}
