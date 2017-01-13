import React, {PropTypes} from 'react'
import {compose, lifecycle, withProps} from 'recompose'
import {createSelector} from 'reselect'
import {List} from 'immutable'
import {connect} from 'react-redux'
import {getLayers} from 'getters/drawers'
import {turnOnLayer, turnOffLayer, changeFilter} from 'actions/drawers'
import {Container, Header, Body, Navbar, Close} from 'components/page/drawer'
import {LayerSet, Layer, FilterSet} from 'components/page/drawer/layers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    WEATHER_STATION,
    SPECIAL_INFORMATION,
} from 'constants/drawers'
import {loadData} from 'actions/map'
import {
    Forecast,
    HotZoneReport,
    Meteogram,
    MountainInformationNetwork,
    WeatherStation,
} from 'components/icons'

const ICONS = new Map([
    [FORECASTS, <Forecast />],
    [HOT_ZONE_REPORTS, <HotZoneReport />],
    [METEOGRAMS, <Meteogram />],
    [MOUNTAIN_INFORMATION_NETWORK, <MountainInformationNetwork />],
    [WEATHER_STATION, <WeatherStation />],
    [SPECIAL_INFORMATION, <Forecast />],
])

// TODO: Improve performance! layers is now an immutable object

const EMPTY_LIST = new List()

Menu.propTypes = {
    layers: PropTypes.object.isRequired,
}

function Menu({sets = EMPTY_LIST, turnOnLayer, turnOffLayer, changeFilter, onCloseClick}) {
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
