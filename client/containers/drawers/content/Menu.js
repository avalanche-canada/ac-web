import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import { createSelector } from 'reselect'
import { List } from 'immutable'
import { connect } from 'react-redux'
import { getLayers } from 'getters/drawers'
import { turnOnLayer, turnOffLayer, changeFilter } from 'actions/drawers'
import { Container, Body, Navbar, Close } from 'components/page/drawer'
import { LayerSet, Layer, FilterSet } from 'components/page/drawer/layers'
import * as Layers from 'constants/drawers'
import { loadData } from 'actions/map'
import * as Icons from 'components/icons'

const ICONS = new Map([
    [Layers.FORECASTS, <Icons.Forecast />],
    [Layers.HOT_ZONE_REPORTS, <Icons.HotZoneReport />],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, <Icons.MountainInformationNetwork />],
    [Layers.MOUNTAIN_CONDITIONS_REPORTS, <Icons.MountainConditionsReport />],
    [Layers.WEATHER_STATION, <Icons.WeatherStation />],
    [Layers.SPECIAL_INFORMATION, <Icons.SpecialInformation />],
    [Layers.FATAL_ACCIDENT, <Icons.FatalAccident />],
    [Layers.TOYOTA_TRUCK_REPORTS, <Icons.ToyotaTruck />],
])

// TODO: Improve performance! layers is now an immutable object

Menu.propTypes = {
    layers: PropTypes.object.isRequired,
}

Menu.propTypes = {
    sets: PropTypes.array,
    turnOnLayer: PropTypes.func.isRequired,
    turnOffLayer: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    onCloseClick: PropTypes.func.isRequired,
}

function Menu({
    sets = new List(),
    turnOnLayer,
    turnOffLayer,
    changeFilter,
    onCloseClick,
}) {
    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Body>
                {sets.toList().map(({ title, layers }, index) =>
                    <LayerSet key={index} title={title}>
                        {layers.toList().map(layer => {
                            const { id, filters, visible, title } = layer
                            const handleFilterChange = changeFilter.bind(
                                null,
                                id
                            )
                            // TODO: Fix that performance issue!
                            function handleClick() {
                                if (visible) {
                                    turnOffLayer(id)
                                } else {
                                    turnOnLayer(id)
                                }
                            }

                            return (
                                <Layer
                                    key={id}
                                    icon={ICONS.get(id)}
                                    onClick={handleClick}
                                    title={title}
                                    visible={visible}>
                                    {filters &&
                                        <FilterSet
                                            filters={filters}
                                            onChange={handleFilterChange}
                                        />}
                                </Layer>
                            )
                        })}
                    </LayerSet>
                )}
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
            })),
    })
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
        },
    })
)(Menu)
