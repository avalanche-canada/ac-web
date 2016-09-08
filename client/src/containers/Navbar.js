import {connect} from 'react-redux'
import {compose, lifecycle, mapProps, withHandlers} from 'recompose'
import Navbar from 'components/navbar'
import {loadForecastRegions} from 'actions/entities'
import * as menus from 'constants/menu'
import TreeModel from 'tree-model'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getIsAuthenticated, getProfile} from 'reducers/auth'
import {ForecastRegion} from 'api/schemas'
import {login, logout} from 'actions/auth'

function mapStateToProps(state) {
    const {name, email} = getProfile(state) || {}

    return {
        isAuthenticated: getIsAuthenticated(state),
        name,
        avatar: email,
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
    mapProps(({regions, ...props}) => {
        let menu = menus.AvalancheCanada

        if (regions) {
            menu.children[1].children[0].children = regions.map(feature => {
                const id = feature.get('id')

                return {
                    id,
                    label: feature.getIn(['properties', 'name']),
                    to: `/map/forecasts/${id}`
                }
            }).toList().sortBy(feature => feature.label).toArray()
        }

        return {
            ...props,
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
    mapProps(() => ({
        isFoundation: true,
        menu: asTree(menus.AvalancheCanadaFoundation),
    })),
)(Navbar)
