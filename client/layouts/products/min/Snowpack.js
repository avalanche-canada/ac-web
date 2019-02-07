import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import List, { Entry } from './List'
import Comment from './Comment'

Snowpack.propTypes = {
    snowpackWhumpfingObserved: PropTypes.string,
    snowpackTestInitiation: PropTypes.string,
    snowpackFootPenetration: PropTypes.number,
    snowpackSiteAspect: PropTypes.object,
    snowpackSledPenetration: PropTypes.number,
    snowpackSiteElevationBand: PropTypes.object,
    snowpackObsType: PropTypes.string,
    snowpackSiteElevation: PropTypes.number,
    snowpackTestFracture: PropTypes.string,
    snowpackTestFailure: PropTypes.number,
    snowpackSurfaceCondition: PropTypes.object,
    snowpackTestFailureLayerCrystalType: PropTypes.object,
    snowpackCrackingObserved: PropTypes.string,
    snowpackSkiPenetration: PropTypes.number,
    snowpackDepth: PropTypes.number,
    tempLatlng: PropTypes.string,
    snowpackObsComment: PropTypes.string,
}

function Snowpack({
    snowpackObsType,
    snowpackSiteElevation,
    snowpackSiteElevationBand,
    snowpackSiteAspect,
    snowpackDepth,
    snowpackWhumpfingObserved,
    snowpackCrackingObserved,
    snowpackSurfaceCondition,
    snowpackFootPenetration,
    snowpackSkiPenetration,
    snowpackSledPenetration,
    snowpackTestInitiation,
    snowpackTestFracture,
    snowpackTestFailure,
    snowpackTestFailureLayerCrystalType,
    snowpackObsComment,
}) {
    return (
        <Fragment>
            <List>
                <Entry term="Is this a point observation or a summary of your day?">
                    {snowpackObsType}
                </Entry>
                <Entry term="Elevation">{snowpackSiteElevation}</Entry>
                <Entry term="Elevation band">{snowpackSiteElevationBand}</Entry>
                <Entry term="Aspect">{snowpackSiteAspect}</Entry>
                <Entry term="Snowpack depth (cm)">{snowpackDepth}</Entry>
                <Entry term="Did you observe whumpfing?">
                    {snowpackWhumpfingObserved}
                </Entry>
                <Entry term="Did you observe cracking?">
                    {snowpackCrackingObserved}
                </Entry>
                <Entry term="Surface condition">
                    {snowpackSurfaceCondition}
                </Entry>
                <Entry term="Foot penetration (cm)">
                    {snowpackFootPenetration}
                </Entry>
                <Entry term="Ski penetration (cm)">
                    {snowpackSkiPenetration}
                </Entry>
                <Entry term="Sled penetration (cm)">
                    {snowpackSledPenetration}
                </Entry>
                <Entry term="Snowpack test result">
                    {snowpackTestInitiation}
                </Entry>
                <Entry term="Snowpack test fracture character">
                    {snowpackTestFracture}
                </Entry>
                <Entry term="Snowpack test failure depth">
                    {snowpackTestFailure}
                </Entry>
                <Entry term="Snowpack test failure layer crystal type">
                    {snowpackTestFailureLayerCrystalType}
                </Entry>
            </List>
            <Comment>{snowpackObsComment}</Comment>
        </Fragment>
    )
}

export default memo(Snowpack)
