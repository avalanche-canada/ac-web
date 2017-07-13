import { connect } from 'react-redux'
import { withProps } from 'recompose'
import Navbar from '~/components/navbar'
import * as Menus from '~/constants/menu'
import { getIsAuthenticated, getProfile } from '~/getters/auth'
import { login, logout } from '~/actions/auth'

function mapStateToProps(state) {
    const { name, picture } = getProfile(state) || {}
    const isAuthenticated = getIsAuthenticated(state)

    return {
        isAuthenticated,
        name,
        avatar: picture,
        menu: Menus.AvalancheCanada,
    }
}

export const AvalancheCanada = connect(mapStateToProps, {
    onLogin: login,
    onLogout: logout,
})(Navbar)

export const AvalancheCanadaFoundation = withProps({
    isFoundation: true,
    menu: Menus.AvalancheCanadaFoundation,
})(Navbar)
