import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import parse from 'date-fns/parse'
import List, { Entry } from './List'
import Comment from './Comment'

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
        avalancheOccurrenceEpoch: PropTypes.string.isRequired,
        vegetationCover: PropTypes.string,
    }
    render() {
        const {
            weakLayerBurialDate,
            avalancheOccurrenceEpoch,
            avalancheOccurrenceTime,
            avalancheObservation,
            avalancheNumber,
            avalancheSize,
            slabThickness,
            slabWidth,
            runLength,
            avalancheCharacter,
            triggerType,
            triggerSubtype,
            triggerDistance,
            startZoneAspect,
            startZoneElevationBand,
            startZoneElevation,
            startZoneIncline,
            runoutZoneElevation,
            weakLayerCrystalType,
            crustNearWeakLayer,
            windExposure,
            vegetationCover,
            avalancheObsComment,
        } = this.props

        return (
            <Fragment>
                <List>
                    <Entry term="Avalanche date">
                        {parse(avalancheOccurrenceEpoch)}
                    </Entry>
                    <Entry term="Avalanche time">
                        {avalancheOccurrenceTime}
                    </Entry>
                    <Entry term="Estimated occurrence time">
                        {avalancheObservation}
                    </Entry>
                    <Entry term="Number of avalanches in this report">
                        {avalancheNumber}
                    </Entry>
                    <Entry term="Avalanche size">{avalancheSize}</Entry>
                    <Entry term="Slab thickness (cm)">{slabThickness}</Entry>
                    <Entry term="Slab width (m)">{slabWidth}</Entry>
                    <Entry term="Run length (m)">{runLength}</Entry>
                    <Entry term="Avalanche character">
                        {avalancheCharacter}
                    </Entry>
                    <Entry term="Trigger type">{triggerType}</Entry>
                    <Entry term="Trigger subtype">{triggerSubtype}</Entry>
                    <Entry term="Remote trigger distance (m)">
                        {triggerDistance}
                    </Entry>
                    <Entry term="Start zone aspect">{startZoneAspect}</Entry>
                    <Entry term="Start zone elevation band">
                        {startZoneElevationBand}
                    </Entry>
                    <Entry term="Start zone elevation (m)">
                        {startZoneElevation}
                    </Entry>
                    <Entry term="Start zone incline">{startZoneIncline}</Entry>
                    <Entry term="Runout zone elevation">
                        {runoutZoneElevation}
                    </Entry>
                    <Entry term="Weak layer burial date">
                        {weakLayerBurialDate && parse(weakLayerBurialDate)}
                    </Entry>
                    <Entry term="Weak layer crystal type">
                        {weakLayerCrystalType}
                    </Entry>
                    <Entry term="Crust near weak layer">
                        {crustNearWeakLayer}
                    </Entry>
                    <Entry term="Wind exposure">{windExposure}</Entry>
                    <Entry term="Vegetation cover">{vegetationCover}</Entry>
                </List>
                <Comment>{avalancheObsComment}</Comment>
            </Fragment>
        )
    }
}
