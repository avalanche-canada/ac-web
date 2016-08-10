import React from 'react'
import {Term, Definition} from 'components/description'
import {trulyKeys} from 'utils/object'

const {keys} = Object
const {isArray} = Array

export function asTermAndDefinition(values = {}, terms = Terms) {
    return keys(values).reduce((children, key) => {
        const value = values[key]

        if (value === undefined || value === null) {
            return children
        }

        children.push(<Term>{terms.get(key)}</Term>)

        switch (typeof value) {
            case 'string':
            case 'number':
                children.push(<Definition>{values[key]}</Definition>)
                break;
            case 'object':
                children.push(<Definition>{trulyKeys(value).join('. ')}</Definition>)
                break;
        }

        return children
    }, [])
}

const Terms = new Map([
    // Incident
    ['groupActivity', 'Activity'],
    ['otherActivityDescription', 'Describe other activity'],
    ['groupSize', 'Total in the group?'],
    ['numberInvolved', 'Number involved'],
    ['numberFullyBuried', 'People fully buried?'],
    ['numberPartlyBuriedImpairedBreathing', 'People partly buried with impaired breathing?'],
    ['numberPartlyBuriedAbleBreathing', 'People partly buried with normal breathing?'],
    ['numberCaughtOnly', 'People injured (caught but not buried)?'],
    ['numberPeopleInjured', 'People not injured (caught but not buried)?'],
    ['terrainShapeTriggerPoint', 'Terrain shape at trigger point'],
    ['snowDepthTriggerPoint', 'Snow depth at trigger point'],
    ['terrainTrap', 'Terrain trap'],
    ['incidentDescription', 'Incident description'],
    // Snowpack
    ['snowpackObsType', 'Is this a point observation or a summary of your day?'],
    ['snowpackSiteElevation', 'Elevation'],
    ['snowpackSiteElevationBand', 'Elevation band'],
    ['snowpackSiteAspect', 'Aspect'],
    ['snowpackDepth', 'Snowpack depth (cm)'],
    ['snowpackWhumpfingObserved', 'Did you observe whumpfing?'],
    ['snowpackCrackingObserved', 'Did you observe cracking?'],
    ['snowpackSurfaceCondition', 'Surface condition'],
    ['snowpackFootPenetration', 'Foot penetration (cm)'],
    ['snowpackSkiPenetration', 'Ski penetration (cm)'],
    ['snowpackSledPenetration', 'Sled penetration (cm)'],
    ['snowpackTestInitiation', 'Snowpack test result'],
    ['snowpackTestFracture', 'Snowpack test fracture character'],
    ['snowpackTestFailure', 'Snowpack test failure depth'],
    ['snowpackTestFailureLayerCrystalType', 'Snowpack test failure layer crystal type'],
    ['snowpackObsComment', 'Observation comment'],
    // Avalanche
    ['avalancheOccurrenceEpoch', 'Avalanche date'],
    ['avalancheOccurrenceTime', 'Avalanche time'],
    ['avalancheObservation', 'Estimated occurrence time'],
    ['avalancheNumber', 'Number of avalanches in this report'],
    ['avalancheSize', 'Avalanche size'],
    ['slabThickness', 'Slab thickness (cm)'],
    ['slabWidth', 'Slab width (m)'],
    ['runLength', 'Run length (m)'],
    ['avalancheCharacter', 'Avalanche character'],
    ['triggerType', 'Trigger type'],
    ['triggerSubtype', 'Trigger subtype'],
    ['triggerDistance', 'Remote trigger distance (m)'],
    ['startZoneAspect', 'Start zone aspect'],
    ['startZoneElevationBand', 'Start zone elevation band'],
    ['startZoneElevation', 'Start zone elevation (m)'],
    ['startZoneIncline', 'Start zone incline'],
    ['runoutZoneElevation', 'Runout zone elevation'],
    ['weakLayerBurialDate', 'Weak layer burial date'],
    ['weakLayerCrystalType', 'Weak layer crystal type'],
    ['crustNearWeakLayer', 'Crust near weak layer'],
    ['windExposure', 'Wind exposure'],
    ['vegetationCover', 'Vegetation cover'],
    ['avalancheObsComment', 'Avalanche observation comment'],
    // Weather
    ['skyCondition', 'Cloud cover'],
    ['precipitationType', 'Precipitation type'],
    ['snowfallRate', 'Snowfall rate (cm/hour)'],
    ['rainfallRate', 'Rainfall rate'],
    ['temperature', 'Temperature at time of observation (deg C)'],
    ['minTemp', 'Minimum temperature in last 24 hours (deg C)'],
    ['maxTemp', 'Maximum temperature in last 24 hours (deg C)'],
    ['temperatureTrend', 'Temperature trend'],
    ['newSnow24Hours', 'Amount of new snow in last 24 hours (cm)'],
    ['precipitation24Hours', 'Total rain and snow combined in last 24 hours (mm)'],
    ['stormSnowAmount', 'Total snow from the most recent storm (cm)'],
    ['stormStartDate', 'Storm start date'],
    ['windSpeed', 'Wind speed'],
    ['windDirection', 'Wind direction'],
    ['blowingSnow', 'Blowing snow'],
    ['weatherObsComment', 'Weather observation comment'],
])
