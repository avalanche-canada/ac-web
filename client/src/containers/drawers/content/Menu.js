import React, {PropTypes} from 'react'
import {compose, lifecycle, withProps} from 'recompose'
import {createSelector} from 'reselect'
import {connect} from 'react-redux'
import {getLayers} from 'getters/drawers'
import {turnOnLayer, turnOffLayer, changeFilter} from 'actions/drawers'
import {Container, Header, Body, Navbar, Close} from 'components/page/drawer'
import {LayerSet, Layer, FilterSet} from 'components/page/drawer/layers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_CONDITION_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    SURFACE_HOAR,
    WEATHER_STATION,
} from 'constants/drawers'
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

const ICONS = new Map([
    [FORECASTS, <Forecast />],
    [HOT_ZONE_REPORTS, <HotZoneReport />],
    [MOUNTAIN_CONDITION_REPORTS, <MountainConditionReport />],
    [METEOGRAMS, <Meteogram />],
    [MOUNTAIN_INFORMATION_NETWORK, <MountainInformationNetwork />],
    [SURFACE_HOAR, <SurfaceHoar />],
    [WEATHER_STATION, <WeatherStation />],
])

// TODO: Improve performance! layers is now an immutable object

Menu.propTypes = {
    layers: PropTypes.object.isRequired,
}

function Menu({sets = [], turnOnLayer, turnOffLayer, changeFilter, onCloseClick}) {
    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Body>
                {sets.map(({title, layers}) => (
                    <LayerSet title={title}>
                        {layers.map(layer => {
                            const id = layer.get('id')
                            const filters = layer.get('filters')
                            const visible = layer.get('visible')
                            const title = layer.get('title')
                            const handleFilterChange = changeFilter.bind(null, id)
                            function handleClick(event) {
                                if (visible) {
                                    turnOffLayer(id)
                                } else {
                                    turnOnLayer(id)
                                }
                            }

                            return (
                                <Layer key={id} icon={ICONS.get(id)} onClick={handleClick} title={title} visible={visible} >
                                    {filters &&
                                        <FilterSet filters={filters} onChange={handleFilterChange} />
                                    }
                                </Layer>
                            )
                        })}
                    </LayerSet>
                ))}
            </Body>
        </Container>
    )
}

const mapStateToProps = createSelector(
    state => getLayers(state),
    layers => ({
        sets: layers
                .groupBy(layer => layer.get('type'))
                .map((layers, title) => ({
                    title,
                    layers,
                })
            )
        }
    )
)

export default compose(
    connect(mapStateToProps, {
        turnOnLayer,
        turnOffLayer,
        changeFilter,
        loadData,
    }),
    lifecycle({
        componentDidUpdate() {
            this.props.loadData()
        }
    }),
)(Menu)
