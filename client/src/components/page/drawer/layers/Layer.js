import React, {PropTypes} from 'react'
import {compose, withState} from 'recompose'
import CSSModules from 'react-css-modules'
import * as TYPES from 'constants/map/layers'
import {
    Forecast,
    HotZoneReport,
    MountainConditionReport,
    Meteogram,
    MountainInformationNetwork,
    SurfaceHoar,
    WeatherStation,
} from 'components/icons'
import {Collapse} from 'components/misc'
import {Expand} from 'components/button'
import {asValues} from 'constants/utils'
import FilterSet from './FilterSet'
import styles from './Layer.css'

const {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_CONDITION_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    SURFACE_HOAR,
    WEATHER_STATION,
} = TYPES

const ICONS = new Map([
    [FORECASTS, <Forecast />],
    [HOT_ZONE_REPORTS, <HotZoneReport />],
    [MOUNTAIN_CONDITION_REPORTS, <MountainConditionReport />],
    [METEOGRAMS, <Meteogram />],
    [MOUNTAIN_INFORMATION_NETWORK, <MountainInformationNetwork />],
    [SURFACE_HOAR, <SurfaceHoar />],
    [WEATHER_STATION, <WeatherStation />],
])

Layer.propTypes = {
    type: PropTypes.oneOf(asValues(TYPES)).isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    filters: PropTypes.object,
}

const {keys} = Object

// Little hack to allow accurate mesuring even when chlidren have
// margins (first and last children)
// http://stackoverflow.com/questions/9770248/div-height-with-child-margin
const STYLE = {
    paddingTop: 1,
    marginTop: -1,
    paddingBottom: 1,
    marginBottom: -1,
}

function Layer({type, title, active = true, filters = {}, expanded, setExpanded}) {
    const hasFilters = keys(filters).length > 0
    function handleClick() {
        setExpanded(!expanded)
    }

    return (
        <div styleName={active ? 'Layer--Active' : 'Layer'}>
            <div styleName='Header'>
                {ICONS.get(type)}
                <span styleName='Title'>{title}</span>
                {hasFilters &&
                    <Expand expanded={expanded} onClick={handleClick} chevron />
                }
            </div>
            {hasFilters &&
                <Collapse collapsed={!expanded}>
                    <div style={STYLE} >
                        <FilterSet filters={filters} />
                    </div>
                </Collapse>
            }
        </div>
    )
}

export default compose(
    withState('expanded', 'setExpanded', false)
)(CSSModules(Layer, styles))
