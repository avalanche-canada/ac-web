import {PropTypes} from 'react'
import {compose, renameProps, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Content from './Content'
import {asTermAndDefinition} from 'components/description/utils'

const {object, number, string} = PropTypes

export default compose(
    setDisplayName('Snowpack'),
    setPropTypes({
        snowpackWhumpfingObserved: string,
        snowpackTestInitiation: string,
        snowpackFootPenetration: number,
        snowpackSiteAspect: object,
        snowpackSledPenetration: number,
        snowpackSiteElevationBand: object,
        snowpackObsType: string,
        snowpackSiteElevation: number,
        snowpackTestFracture: string,
        snowpackTestFailure: number,
        snowpackSurfaceCondition: object,
        snowpackTestFailureLayerCrystalType: object,
        snowpackCrackingObserved: string,
        snowpackSkiPenetration: number,
        snowpackDepth: number,
        tempLatlng: string,
        snowpackObsComment: string,
    }),
    renameProps({
        snowpackObsType: 'Is this a point observation or a summary of your day?',
        snowpackSiteElevation: 'Elevation',
        snowpackSiteElevationBand: 'Elevation band',
        snowpackSiteAspect: 'Aspect',
        snowpackDepth: 'Snowpack depth (cm)',
        snowpackWhumpfingObserved: 'Did you observe whumpfing?',
        snowpackCrackingObserved: 'Did you observe cracking?',
        snowpackSurfaceCondition: 'Surface condition',
        snowpackFootPenetration: 'Foot penetration (cm)',
        snowpackSkiPenetration: 'Ski penetration (cm)',
        snowpackSledPenetration: 'Sled penetration (cm)',
        snowpackTestInitiation: 'Snowpack test result',
        snowpackTestFracture: 'Snowpack test fracture character',
        snowpackTestFailure: 'Snowpack test failure depth',
        snowpackTestFailureLayerCrystalType: 'Snowpack test failure layer crystal type',
    }),
    mapProps(({snowpackObsComment, tempLatlng, ...values}) => ({
        comment: snowpackObsComment,
        descriptions: asTermAndDefinition(values),
    }))
)(Content)
