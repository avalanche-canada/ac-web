import {connect} from 'react-redux'
import {compose, withProps, withHandlers} from 'recompose'
import Navbar from 'components/navbar'
import * as menus from 'constants/menu'
import TreeModel from 'tree-model'
import {getIsAuthenticated, getProfile} from 'reducers/auth'
import {login, logout} from 'actions/auth'

function mapStateToProps(state) {
    const {name, email, picture} = getProfile(state) || {}

    return {
        isAuthenticated: getIsAuthenticated(state),
        name,
        avatar: picture,
    }
}

function asTree(menu) {
    return (new TreeModel()).parse(menu)
}

export const AvalancheCanada = compose(
    connect(mapStateToProps, {
        login,
        logout,
    }),
    withProps({
        menu: asTree(menus.AvalancheCanada)
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

export const AvalancheCanadaFoundation = compose(
    withProps({
        isFoundation: true,
        menu: asTree(menus.AvalancheCanadaFoundation),
    }),
)(Navbar)
