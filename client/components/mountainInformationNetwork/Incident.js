import React from 'react'
import PropTypes from 'prop-types'
import { List } from '~/components/description'
import { asTermAndDefinition } from '~/components/description/utils'
import Section from './Section'
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
    tempLatlng: PropTypes.string,
}

const TERMS = {
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
}

export default function Incident({
    incidentDescription,
    tempLatlng,
    groupDetails,
    ...values
}) {
    return (
        <div>
            <Section>
                <List bordered>
                    {asTermAndDefinition(values, TERMS)}
                </List>
            </Section>
            {groupDetails &&
                <Section title="Group details">
                    <List bordered>
                        {asTermAndDefinition(groupDetails, TERMS)}
                    </List>
                </Section>}
            <Comment>
                {incidentDescription}
            </Comment>
        </div>
    )
}
