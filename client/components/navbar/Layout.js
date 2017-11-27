import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import Cabinet from 'components/drawer'
import { createItem } from './Factories'
import styles from './Navbar.css'
import Burger from './Burger'
import ItemSet from './ItemSet'
import Brand from './Brand'
import Donate from './Donate'
import Dimensions from 'components/Dimensions'

export default class Layout extends PureComponent {
    static propTypes = {
        menu: PropTypes.object.isRequired,
        logo: PropTypes.string.isRequired,
        donate: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    }
    state = {
        isCabinetOpened: false,
    }
    get brand() {
        const { to, label } = this.props.menu
        const style = {
            backgroundImage: `url("${this.props.logo}")`,
        }

        return <Brand to={to} title={label} style={style} />
    }
    get burger() {
        return <Burger onClick={this.showCabinet} />
    }
    get items() {
        return (
            <ItemSet>
                {this.props.menu.children.map(createItem)}
                {this.props.children}
            </ItemSet>
        )
    }
    get cabinet() {
        return (
            <Cabinet
                menu={this.props.menu}
                show={this.state.isCabinetOpened}
                onClose={this.hideCabinet}
            />
        )
    }
    get donate() {
        return <Donate to={this.props.donate} />
    }
    showCabinet = () => this.setState({ isCabinetOpened: true })
    hideCabinet = () => this.setState({ isCabinetOpened: false })
    renderer = ({ width }) => {
        const fullNavbar = width > 768

        return (
            <div className={styles.Layout}>
                <Navbar>
                    {this.brand}
                    {fullNavbar && this.items}
                    {fullNavbar || this.burger}
                    {this.donate}
                </Navbar>
                {fullNavbar || this.cabinet}
            </div>
        )
    }
    render() {
        return <Dimensions>{this.renderer}</Dimensions>
    }
}
