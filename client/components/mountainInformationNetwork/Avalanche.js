import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Content from './Content'
import { asTermAndDefinition } from 'components/description/utils'
import parse from 'date-fns/parse'

export default class Avalanche extends PureComponent {
    static propTypes = {
        windExposure: PropTypes.string,
        runoutZoneElevation: PropTypes.number,
        weakLayerCrystalType: PropTypes.object,
        avalancheSize: PropTypes.string,
        avalancheCharacter: PropTypes.object,
        avalancheObsComment: PropTypes.string,
        slabWidth: PropTypes.number,
        crustNearWeakLayer: PropTypes.string,
        runLength: PropTypes.number,
        avalancheNumber: PropTypes.string,
        avalancheOccurrenceTime: PropTypes.string,
        startZoneAspect: PropTypes.object,
        avalancheObservation: PropTypes.string,
        weakLayerBurialDate: PropTypes.string,
        startZoneElevationBand: PropTypes.object,
        startZoneElevation: PropTypes.number,
        slabThickness: PropTypes.number,
        startZoneIncline: PropTypes.number,
        triggerSubtype: PropTypes.string,
        triggerDistance: PropTypes.number,
        tempLatlng: PropTypes.string,
        triggerType: PropTypes.string,
        avalancheOccurrenceEpoch: PropTypes.string,
        vegetationCover: PropTypes.string,
    }
    render() {
        const {
            avalancheObsComment,
            tempLatlng,
            weakLayerBurialDate,
            avalancheOccurrenceEpoch,
            ...values
        } = this.props

        Object.assign(values, {
            avalancheOccurrenceEpoch: parse(avalancheOccurrenceEpoch),
            weakLayerBurialDate:
                weakLayerBurialDate && parse(weakLayerBurialDate),
        })

        return (
            <Content
                comment={avalancheObsComment}
                descriptions={asTermAndDefinition(values, TERMS)}
            />
        )
    }
}

const TERMS = {
    avalancheOccurrenceEpoch: 'Avalanche date',
    avalancheOccurrenceTime: 'Avalanche time',
    avalancheObservation: 'Estimated occurrence time',
    avalancheNumber: 'Number of avalanches in this report',
    avalancheSize: 'Avalanche size',
    slabThickness: 'Slab thickness (cm)',
    slabWidth: 'Slab width (m)',
    runLength: 'Run length (m)',
    avalancheCharacter: 'Avalanche character',
    triggerType: 'Trigger type',
    triggerSubtype: 'Trigger subtype',
    triggerDistance: 'Remote trigger distance (m)',
    startZoneAspect: 'Start zone aspect',
    startZoneElevationBand: 'Start zone elevation band',
    startZoneElevation: 'Start zone elevation (m)',
    startZoneIncline: 'Start zone incline',
    runoutZoneElevation: 'Runout zone elevation',
    weakLayerBurialDate: 'Weak layer burial date',
    weakLayerCrystalType: 'Weak layer crystal type',
    crustNearWeakLayer: 'Crust near weak layer',
    windExposure: 'Wind exposure',
    vegetationCover: 'Vegetation cover',
}
