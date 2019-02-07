import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import List, { Entry } from './List'
import Comment from './Comment'

Incident.propTypes = {
    otherActivityDescription: PropTypes.string,
    groupActivity: PropTypes.object,
    groupDetails: PropTypes.shape({
        groupSize: PropTypes.number,
        numberPeopleInjured: PropTypes.number,
        numberPartlyBuriedAbleBreathing: PropTypes.number,
        numberCaughtOnly: PropTypes.number,
        numberFullyBuried: PropTypes.string,
        numberPartlyBuriedImpairedBreathing: PropTypes.number,
    }),
    numberInvolved: PropTypes.number,
    terrainShapeTriggerPoint: PropTypes.string,
    incidentDescription: PropTypes.string,
    terrainTrap: PropTypes.object,
    snowDepthTriggerPoint: PropTypes.string,
}

function Incident({
    groupActivity,
    otherActivityDescription,
    numberInvolved,
    terrainShapeTriggerPoint,
    incidentDescription,
    terrainTrap,
    snowDepthTriggerPoint,
    groupDetails,
}) {
    return (
        <Fragment>
            <List>
                <Entry term="Activity">{groupActivity}</Entry>
                <Entry term="Describe other activity">
                    {otherActivityDescription}
                </Entry>
                <Entry term="Number involved">{numberInvolved}</Entry>
                <Entry term="Terrain shape at trigger point">
                    {terrainShapeTriggerPoint}
                </Entry>
                <Entry term="Snow depth at trigger point">
                    {snowDepthTriggerPoint}
                </Entry>
                <Entry term="Terrain trap">{terrainTrap}</Entry>
            </List>
            {groupDetails && (
                <List title="Group details">
                    <Entry term="Total in the group?">
                        {groupDetails.groupSize}
                    </Entry>
                    <Entry term="People fully buried?">
                        {groupDetails.numberFullyBuried}
                    </Entry>
                    <Entry term="People partly buried with impaired breathing?">
                        {groupDetails.numberPartlyBuriedImpairedBreathing}
                    </Entry>
                    <Entry term="People partly buried with normal breathing?">
                        {groupDetails.numberPartlyBuriedAbleBreathing}
                    </Entry>
                    <Entry term="People injured (caught but not buried)?">
                        {groupDetails.numberCaughtOnly}
                    </Entry>
                    <Entry term="People not injured (caught but not buried)?">
                        {groupDetails.numberPeopleInjured}
                    </Entry>
                </List>
            )}
            <Comment>{incidentDescription}</Comment>
        </Fragment>
    )
}

export default memo(Incident)
