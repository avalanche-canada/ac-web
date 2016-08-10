import {PropTypes} from 'react'
import {compose, renameProp, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Content from './Content'

const {object, number, string} = PropTypes

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
    renameProp('avalancheObsComment', 'comment'),
    mapProps(props => {
        delete props.tempLatlng

        return props
    })
)(Content)
