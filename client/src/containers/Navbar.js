import {connect} from 'react-redux'
import {compose, lifecycle, mapProps, withProps, withHandlers} from 'recompose'
import Navbar from 'components/navbar'
import {loadForecastRegions} from 'actions/entities'
import * as menus from 'constants/menu'
import TreeModel from 'tree-model'
import {getEntitiesForSchema} from 'getters/entities'
import {getIsAuthenticated, getProfile} from 'reducers/auth'
import {ForecastRegion} from 'api/schemas'
import {login, logout} from 'actions/auth'

function mapStateToProps(state) {
    const {name, email, picture} = getProfile(state) || {}

    return {
        isAuthenticated: getIsAuthenticated(state),
        name,
        avatar: picture,
        regions: getEntitiesForSchema(state, ForecastRegion),
    }
}

function asTree(menu) {
    return (new TreeModel()).parse(menu)
}

export const AvalancheCanada = compose(
    connect(mapStateToProps, {
        loadForecastRegions,
        login,
        logout,
    }),
    lifecycle({
        componentDidMount() {
            this.props.loadForecastRegions()
        }
    }),
    withProps(({regions}) => {
        let menu = menus.AvalancheCanada

        if (regions) {
            // FIXME: This is really bad code!!! There must be a better way to do that.
            menu.children[1].children[0].children = regions.map(feature => {
                const id = feature.get('id')

                return {
                    id,
                    key: id,
                    label: feature.getIn(['properties', 'name']),
                    to: `/map/forecasts/${id}`
                }
            }).toList().sortBy(feature => feature.label).toArray()
        }

        return {
            menu: asTree(menu)
        }
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
