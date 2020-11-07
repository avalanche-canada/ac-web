import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Section from './Section'
import Comment from './Comment'
import { trulyKeys } from 'utils/object'
import { List, Term, Definition } from 'components/description'

// No i18n required: will be provided by the API

Quick.propTypes = {
    avalancheConditions: PropTypes.shape({
        sound: PropTypes.bool.isRequired,
        snow: PropTypes.bool.isRequired,
        slab: PropTypes.bool.isRequired,
        temp: PropTypes.bool.isRequired,
    }).isRequired,
    ridingConditions: PropTypes.shape({
        snowConditions: PropTypes.object.isRequired,
        ridingQuality: PropTypes.object.isRequired,
        stayedAway: PropTypes.object.isRequired,
        rideType: PropTypes.object.isRequired,
        weather: PropTypes.object.isRequired,
    }).isRequired,
    comment: PropTypes.string,
}

export default function Quick({
    avalancheConditions,
    ridingConditions,
    comment,
}) {
    // TODO: Improve code here! So confusing this truly key!!!
    // TODO: Simplify code!!!!!
    ridingConditions = computeRidingConditions(ridingConditions)
    avalancheConditions = trulyKeys(avalancheConditions).map(
        key => avalancheConditionsTexts[key]
    )

    const hasAvalancheConditions = avalancheConditions.length > 0
    const hasRidingConditions = ridingConditions.length > 0
    const hasInformation = hasAvalancheConditions || hasRidingConditions

    return (
        <Fragment>
            {hasInformation && (
                <Section title="Information">
                    <List bordered>
                        {hasAvalancheConditions && (
                            <Fragment>
                                <Term block>Avalanche conditions</Term>
                                <Definition block>
                                    <ul>
                                        {avalancheConditions.map(
                                            (condition, index) => (
                                                <li key={index}>{condition}</li>
                                            )
                                        )}
                                    </ul>
                                </Definition>
                            </Fragment>
                        )}
                        {hasRidingConditions && ridingConditions}
                    </List>
                </Section>
            )}
            {comment && <Comment>{comment}</Comment>}
        </Fragment>
    )
}

// Constants & utils
const avalancheConditionsTexts = {
    slab: 'Slab avalanches today or yesterday.',
    sound: 'Whumpfing or drum-like sounds or shooting cracks.',
    snow:
        '30cm + of new snow, or significant drifting, or rain in the last 48 hours.',
    temp: 'Rapid temperature rise to near zero degrees or wet surface snow.',
}

const RidingConditionsTitles = new Map([
    ['snowConditions', 'Snow conditions'],
    ['ridingQuality', 'Riding quality'],
    ['stayedAway', 'We stayed away from'],
    ['rideType', 'We rode'],
    ['weather', 'The day was'],
])

function computeRidingConditions(conditions = {}) {
    return Object.keys(conditions).reduce((children, key) => {
        const { type, prompt, selected, options } = conditions[key]
        const term = RidingConditionsTitles.get(key) || prompt

        switch (type) {
            case 'single':
                if (selected) {
                    children.push(<Term key={`${key}-term`}>{term}</Term>)
                    children.push(<Definition key={key}>{selected}</Definition>)
                }
                break
            case 'multiple': {
                const values = trulyKeys(options)

                if (values.length > 0) {
                    children.push(<Term key={`${key}-term`}>{term}</Term>)
                    children.push(
                        <Definition key={key}>
                            <ul>
                                {values.map((value, index) => (
                                    <li key={index}>{value}</li>
                                ))}
                            </ul>
                        </Definition>
                    )
                }
                break
            }
        }

        return children
    }, [])
}
