import {connect} from 'react-redux'
import {compose, lifecycle, mapProps} from 'recompose'
import Navbar from 'components/navbar'
import {loadForecastRegions} from 'actions/entities'
import * as menus from 'constants/menu'
import TreeModel from 'tree-model'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {ForecastRegion} from 'api/schemas'
import {history} from 'router'

function getForeccastRegions(state) {
    return {
        regions: getEntitiesForSchema(state, ForecastRegion)
    }
}

function asTree(menu) {
    return (new TreeModel()).parse(menu)
}
function handleLogin() {
    history.push('/login')
}
function handleLogout() {
    history.push('/logout')
}


export const AvalancheCanada = compose(
    connect(getForeccastRegions, {
        loadForecastRegions,
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
            onLogin: handleLogin,
            onLogout: handleLogout,
            menu: asTree(menu)
        }
    }),
)(Navbar)

export const AvalancheCanadaFoundation = compose(
    mapProps(() => ({
        isFoundation: true,
        menu: asTree(menus.AvalancheCanadaFoundation),
    })),
)(Navbar)
