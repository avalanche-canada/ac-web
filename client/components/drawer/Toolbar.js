import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { useIntl } from 'react-intl'
import { memo } from 'utils/react'
import styles from './Drawer.css'

Toolbar.propTypes = {
    onClose: PropTypes.func.isRequired,
    home: PropTypes.shape({
        to: PropTypes.string.isRequired,
    }).isRequired,
}

function Toolbar({ onClose, home }) {
    const intl = useIntl()

    return (
        <section className={styles.Toolbar}>
            <Link
                to={home.to}
                className={styles.Home}
                title={intl.formatMessage({
                    description: 'Component Drawer/Toolbar',
                    defaultMessage: 'Go to home page',
                })}
            />
            <a
                href="#"
                onClick={onClose}
                className={styles.Close}
                title={intl.formatMessage({
                    description: 'Component Drawer/Toolbar',
                    defaultMessage: 'Close',
                })}
            />
        </section>
    )
}

export default memo.static(Toolbar)
