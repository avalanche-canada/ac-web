import React, {PropTypes} from 'react'
import {compose, renameProp, renameProps, setDisplayName, setPropTypes, withProps, mapProps, defaultProps} from 'recompose'
import Content from 'components/mountainInformationNetwork/Content'
import {asTermAndDefinition} from 'components/description/utils'
import {InnerHTML} from 'components/misc'

export default compose(
    setDisplayName('CriticalFactors'),
    setPropTypes({
        persistentAvalancheProblem: PropTypes.oneOf([true, false, null]),
        slabAvalanches: PropTypes.oneOf([true, false, null]),
        instability: PropTypes.oneOf([true, false, null]),
        recentSnowfall: PropTypes.oneOf([true, false, null]),
        recentRainfall: PropTypes.oneOf([true, false, null]),
        recentWindLoading: PropTypes.oneOf([true, false, null]),
        significantWarming: PropTypes.oneOf([true, false, null]),
        comments: PropTypes.string,
    }),
    defaultProps({
        persistentAvalancheProblem: 'Unknown',
        slabAvalanches: 'Unknown',
        instability: 'Unknown',
        recentSnowfall: 'Unknown',
        recentRainfall: 'Unknown',
        recentWindLoading: 'Unknown',
        significantWarming: 'Unknown',
        comments: 'Unknown',
    }),
    renameProps({
        persistentAvalancheProblem: 'Persistent avalanche problem',
        slabAvalanches: 'Slab avalanches in the last 48 hours',
        instability: 'Signs of instability',
        recentSnowfall: 'Recent snowfall > 30cm',
        recentRainfall: 'Recent rainfall',
        recentWindLoading: 'Recent wind loading',
        significantWarming: 'Significant warming',
    }),
    mapProps(({comments, ...values}) => ({
        comment: comments && <InnerHTML>{comments}</InnerHTML>,
        descriptions: asTermAndDefinition(values, undefined, 'Unknown'),
    })),
)(Content)
