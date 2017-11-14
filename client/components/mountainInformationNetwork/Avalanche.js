import PropTypes from 'prop-types'
import {
    compose,
    renameProps,
    setDisplayName,
    setPropTypes,
    mapProps,
    withProps,
} from 'recompose'
import Content from './Content'
import { asTermAndDefinition } from 'components/description/utils'
import parse from 'date-fns/parse'

const { object, number, string } = PropTypes

export default compose(
    setDisplayName('Avalanche'),
    setPropTypes({
        windExposure: string,
        runoutZoneElevation: number,
        weakLayerCrystalType: object,
        avalancheSize: string,
        avalancheCharacter: object,
        avalancheObsComment: string,
        slabWidth: number,
        crustNearWeakLayer: string,
        runLength: number,
        avalancheNumber: string,
        avalancheOccurrenceTime: string,
        startZoneAspect: object,
        avalancheObservation: string,
        weakLayerBurialDate: string,
        startZoneElevationBand: object,
        startZoneElevation: number,
        slabThickness: number,
        startZoneIncline: number,
        triggerSubtype: string,
        triggerDistance: number,
        tempLatlng: string,
        triggerType: string,
        avalancheOccurrenceEpoch: string,
        vegetationCover: string,
    }),
    withProps(({ weakLayerBurialDate, avalancheOccurrenceEpoch }) => ({
        avalancheOccurrenceEpoch: parse(avalancheOccurrenceEpoch),
        weakLayerBurialDate: weakLayerBurialDate && parse(weakLayerBurialDate),
    })),
    renameProps({
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
    }),
    mapProps(({ avalancheObsComment, tempLatlng, ...values }) => ({
        comment: avalancheObsComment,
        descriptions: asTermAndDefinition(values),
    }))
)(Content)
