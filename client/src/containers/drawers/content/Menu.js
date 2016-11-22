import React, {PropTypes} from 'react'
import {compose, lifecycle, withProps} from 'recompose'
import {connect} from 'react-redux'
import getLayers from 'selectors/menu'
import {toggleLayer, changeFilter} from 'actions/drawers'
import {Header, Container, Navbar, Close, Body} from 'components/page/drawer'
import {LayerSet, Layer, FilterSet} from 'components/page/drawer/layers'
import * as LAYERS from 'constants/map/layers'
import {loadData} from 'actions/map'
import {
    Forecast,
    HotZoneReport,
    MountainConditionReport,
    Meteogram,
    MountainInformationNetwork,
    SurfaceHoar,
    WeatherStation,
} from 'components/icons'

const {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_CONDITION_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    SURFACE_HOAR,
    WEATHER_STATION,
} = LAYERS

const ICONS = new Map([
    [FORECASTS, <Forecast />],
    [HOT_ZONE_REPORTS, <HotZoneReport />],
    [MOUNTAIN_CONDITION_REPORTS, <MountainConditionReport />],
    [METEOGRAMS, <Meteogram />],
    [MOUNTAIN_INFORMATION_NETWORK, <MountainInformationNetwork />],
    [SURFACE_HOAR, <SurfaceHoar />],
    [WEATHER_STATION, <WeatherStation />],
])

Menu.propTypes = {
    layers: PropTypes.object.isRequired,
}

function toObject(layer) {
    return layer.toObject()
}

function Menu({sets = [], toggleLayer, changeFilter, onCloseClick}) {
    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Body>
            {sets.map(({title, layers}) => (
                <LayerSet title={title}>
                    {layers.map(toObject).map(({filters, ...layer}, type) => {
                        const handleFilterChange = changeFilter.bind(null, type)
                        const props = {
                            ...layer,
                            key: type,
                            icon: ICONS.get(type),
                            onClick: event => toggleLayer(type),
                        }

                        return (
                            <Layer {...props}>
                                {filters && <FilterSet filters={filters} onChange={handleFilterChange} />}
                            </Layer>
                        )
                    })}
                </LayerSet>
            ))}
            </Body>
        </Container>
    )
}

export default compose(
    connect(getLayers, {
        toggleLayer,
        changeFilter,
        loadData,
    }),
    withProps(({layers}) => {
        return {
            sets: layers.groupBy(layer => layer.type).map((layers, title) => {
                return {
                    title,
                    layers,
                }
            })
        }
    }),
    lifecycle({
        componentDidUpdate() {
            this.props.loadData()
        }
    })
)(Menu)
