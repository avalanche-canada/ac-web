import {PropTypes} from 'react'
import {compose, renameProp, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Content from './Content'

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
    renameProp('snowpackObsComment', 'comment'),
    mapProps(props => {
        delete props.tempLatlng

        return props
    })
)(Content)
