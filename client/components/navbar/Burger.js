import React from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import { Menu } from 'components/icons'
import Button, { INCOGNITO } from '../button'
import styles from './Navbar.css'

export default class Burger extends StaticComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    }
    render() {
        return (
            <div className={styles['Burger--Container']}>
                <Button
                    kind={INCOGNITO}
                    className={styles.Burger}
                    onClick={this.props.onClick}>
                    <Menu width={32} height={32} />
                </Button>
            </div>
        )
    }
}
