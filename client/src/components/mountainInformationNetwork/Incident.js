import {PropTypes} from 'react'
import {compose, renameProp, setDisplayName, setPropTypes, mapProps} from 'recompose'
import Content from './Content'

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
    renameProp('incidentDescription', 'comment'),
    mapProps(props => {
        delete props.tempLatlng

        return props
    })
)(Content)
