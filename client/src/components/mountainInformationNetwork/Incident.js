import {PropTypes} from 'react'
import {compose, renameProps, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Content from './Content'
import {asTermAndDefinition} from 'components/description/utils'

const {object, number, string} = PropTypes

export default compose(
    setDisplayName('Incident'),
    setPropTypes({
        otherActivityDescription: string,
        groupActivity: object,
        numberPartlyBuriedImpairedBreathing: number,
        terrainShapeTriggerPoint: string,
        incidentDescription: string,
        terrainTrap: object,
        numberPeopleInjured: number,
        numberPartlyBuriedAbleBreathing: number,
        snowDepthTriggerPoint: string,
        numberInvolved: number,
        numberCaughtOnly: number,
        groupSize: number,
        numberFullyBuried: string,
        tempLatlng: string,
    }),
    renameProps({
        groupActivity: 'Activity',
        otherActivityDescription: 'Describe other activity',
        groupSize: 'Total in the group?',
        numberInvolved: 'Number involved',
        numberFullyBuried: 'People fully buried?',
        numberPartlyBuriedImpairedBreathing: 'People partly buried with impaired breathing?',
        numberPartlyBuriedAbleBreathing: 'People partly buried with normal breathing?',
        numberCaughtOnly: 'People injured (caught but not buried)?',
        numberPeopleInjured: 'People not injured (caught but not buried)?',
        terrainShapeTriggerPoint: 'Terrain shape at trigger point',
        snowDepthTriggerPoint: 'Snow depth at trigger point',
        terrainTrap: 'Terrain trap',
    }),
    mapProps(({incidentDescription, tempLatlng, ...values}) => ({
        comment: incidentDescription,
        descriptions: asTermAndDefinition(values),
    }))
)(Content)
