import {connect} from 'react-redux'
import {compose, withProps, withHandlers} from 'recompose'
import Navbar from 'components/navbar'
import * as Menus from 'constants/menu'
import {getIsAuthenticated, getProfile} from 'getters/auth'
import {login, logout} from 'actions/auth'

function mapStateToProps(state) {
    const {name, email, picture} = getProfile(state) || {}

    return {
        isAuthenticated: getIsAuthenticated(state),
        name,
        avatar: picture,
    }
}

export const AvalancheCanada = compose(
    connect(mapStateToProps, {
        login,
        logout,
    }),
    withProps({
        menu: Menus.AvalancheCanada,
    }),
    withHandlers({
        onLogin: props => event => {
            props.login()
        },
        onLogout: props => event => {
            props.logout()
        },
    })
)(Navbar)

export const AvalancheCanadaFoundation = withProps({
    isFoundation: true,
    menu: Menus.AvalancheCanadaFoundation,
})(Navbar)
