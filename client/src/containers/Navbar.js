import {connect} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import {compose, defaultProps, withProps, withHandlers, lifecycle} from 'recompose'
import Navbar from 'components/navbar'
import * as menus from 'constants/menu'
import TreeModel from 'tree-model'
import {getIsAuthenticated, getProfile} from 'getters/auth'
import {getDocumentsOfType} from 'getters/prismic'
import {login, logout} from 'actions/auth'
import {loadForType} from 'actions/prismic'
import Parser from 'prismic/parser'

const getFeatures = createSelector(
    state => getDocumentsOfType(state, 'application-feature'),
    features => features.map(feature => Parser.parse(feature))
                        .toList()
                        .sortBy(feature => feature.date)
                        .reverse()
)

function asTree(menu) {
    return (new TreeModel()).parse(menu)
}

export const AvalancheCanada = compose(
    connect(createStructuredSelector({
        features: getFeatures,
        isAuthenticated: getIsAuthenticated,
        profile: getProfile,
    }), {
        login,
        logout,
        loadForType,
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForType('application-feature')
        }
    }),
    defaultProps({
        menu: asTree(menus.AvalancheCanada),
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
    menu: asTree(menus.AvalancheCanadaFoundation),
})(Navbar)
