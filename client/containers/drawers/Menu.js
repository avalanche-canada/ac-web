import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createSelector } from 'reselect'
import { List } from 'immutable'
import { connect } from 'react-redux'
import { getLayers } from 'getters/drawers'
import { turnOnLayer, turnOffLayer, changeFilter } from 'actions/drawers'
import { Container, Body, Navbar, Close } from 'components/page/drawer'
import { LayerSet, Layer, FilterSet } from 'components/page/drawer/layers'
import * as Layers from 'constants/drawers'
import { loadData as load } from 'actions/map'
import * as Icons from 'components/icons'

const BODY_STYLE = {
    padding: '0 1.25em',
}

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

@connect(mapStateToProps, {
    turnOnLayer,
    turnOffLayer,
    changeFilter,
    load,
})
export default class Menu extends Component {
    static propTypes = {
        sets: PropTypes.array,
        turnOnLayer: PropTypes.func.isRequired,
        turnOffLayer: PropTypes.func.isRequired,
        changeFilter: PropTypes.func.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        load: PropTypes.func.isRequired,
    }
    static defaultProps = {
        sets: new List(),
    }
    componentDidUpdate() {
        this.props.load()
    }
    shouldUpdateComponent({ sets }) {
        return this.props.sets !== sets
    }
    render() {
        const {
            sets = new List(),
            turnOnLayer,
            turnOffLayer,
            changeFilter,
            onCloseClick,
        } = this.props

        return (
            <Container>
                <Navbar>
                    <Close onClick={onCloseClick} />
                </Navbar>
                <Body style={BODY_STYLE}>
                    {sets.toList().map(({ title, layers }, index) => (
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
                                        {filters && (
                                            <FilterSet
                                                filters={filters}
                                                onChange={handleFilterChange}
                                            />
                                        )}
                                    </Layer>
                                )
                            })}
                        </LayerSet>
                    ))}
                </Body>
            </Container>
        )
    }
}
