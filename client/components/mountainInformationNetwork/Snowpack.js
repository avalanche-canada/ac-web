import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Content from './Content'
import { asTermAndDefinition } from 'components/description/utils'

export default class Snowpack extends PureComponent {
    static propTypes = {
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
    render() {
        const { snowpackObsComment, tempLatlng, ...values } = this.props

        return (
            <Content
                comment={snowpackObsComment}
                descriptions={asTermAndDefinition(values, TERMS)}
            />
        )
    }
}

const TERMS = {
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
    snowpackTestFailureLayerCrystalType:
        'Snowpack test failure layer crystal type',
}
