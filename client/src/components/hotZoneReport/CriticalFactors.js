import {PropTypes} from 'react'
import {compose, renameProp, renameProps, setDisplayName, setPropTypes, withProps, mapProps, defaultProps} from 'recompose'
import Content from 'components/mountainInformationNetwork/Content'
import {asTermAndDefinition} from 'components/description/utils'

const {string} = PropTypes

export default compose(
    setDisplayName('CriticalFactors'),
    setPropTypes({
        persistentAvalancheProblem: string,
        slabAvalanches: string,
        instability: string,
        recentSnowfall: string,
        recentRainfall: string,
        recentWindloading: string,
        significantWarming: string,
        criticalFactorsComments: string,
    }),
    defaultProps({
        persistentAvalancheProblem: 'N/A',
        slabAvalanches: 'N/A',
        instability: 'N/A',
        recentSnowfall: 'N/A',
        recentRainfall: 'N/A',
        recentWindloading: 'N/A',
        significantWarming: 'N/A',
        criticalFactorsComments: 'N/A',
    }),
    renameProps({
        persistentAvalancheProblem: 'Persistent avalanche problem',
        slabAvalanches: 'Slab avalanches in the last 48 hours',
        instability: 'Signs of instability',
        recentSnowfall: 'Recent snowfall > 30cm',
        recentRainfall: 'Recent rainfall',
        recentWindloading: 'Recent windloading',
        significantWarming: 'Significant warming',
    }),
    mapProps(({criticalFactorsComments, ...values}) => ({
        comment: criticalFactorsComments,
        descriptions: asTermAndDefinition(values),
    }))
)(Content)
