import React from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import { Link } from 'react-router-dom'
import styles from './Drawer.css'

export default class Toolbar extends StaticComponent {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        home: PropTypes.shape({
            to: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }).isRequired,
    }
    render() {
        const { onClose, home = { to: '/' } } = this.props

        return (
            <section className={styles.Toolbar}>
                <Link
                    to={home.to}
                    className={styles.Home}
                    title="Go to home page"
                />
                <a
                    href="#"
                    onClick={onClose}
                    className={styles.Close}
                    title="Close"
                />
            </section>
        )
    }
}
