import React from 'react'
import PropTypes from 'prop-types'
import {compose, lifecycle, withProps} from 'recompose'
import {createSelector} from 'reselect'
import {List} from 'immutable'
import {connect} from 'react-redux'
import {getLayers} from '/getters/drawers'
import {turnOnLayer, turnOffLayer, changeFilter} from 'actions/drawers'
import {Container, Header, Body, Navbar, Close} from '/components/page/drawer'
import {LayerSet, Layer, FilterSet} from '/components/page/drawer/layers'
import * as Layers from '/constants/drawers'
import {loadData} from 'actions/map'
import {
    Forecast,
    HotZoneReport,
    MountainInformationNetwork,
    WeatherStation,
    SpecialInformation,
    FatalAccident,
    ToyotaTruck,
} from '/components/icons'

const ICONS = new Map([
    [Layers.FORECASTS, <Forecast />],
    [Layers.HOT_ZONE_REPORTS, <HotZoneReport />],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, <MountainInformationNetwork />],
    [Layers.WEATHER_STATION, <WeatherStation />],
    [Layers.SPECIAL_INFORMATION, <SpecialInformation />],
    [Layers.FATAL_ACCIDENT, <FatalAccident />],
    [Layers.TOYOTA_TRUCK_REPORTS, <ToyotaTruck />],
])

// TODO: Improve performance! layers is now an immutable object

const EMPTY_LIST = new List()

Menu.propTypes = {
    layers: PropTypes.object.isRequired,
}

function Menu({
    sets = EMPTY_LIST,
    turnOnLayer,
    turnOffLayer,
    changeFilter,
    onCloseClick
}) {
    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Body>
                {sets.toList().map(({title, layers}, index) => (
                    <LayerSet key={index} title={title}>
                        {layers.toList().map(layer => {
                            const {id, filters, visible, title} = layer
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
