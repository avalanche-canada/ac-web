import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'components/icons'
import Button, { INCOGNITO } from '../button'
import styles from './Navbar.css'

export default class Burger extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    }
    shouldComponentUpdate() {
        return false
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
