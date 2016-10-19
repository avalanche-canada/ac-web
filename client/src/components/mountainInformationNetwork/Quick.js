import React, {PropTypes} from 'react'
import Section from './Section'
import Comment from './Comment'
import {trulyKeys, projectKeys} from 'utils/object'
import {List, Term, Definition} from 'components/description'

const avalancheConditionsTexts = {
    sound: 'Slab avalanches today or yesterday.',
    snow: 'Whumpfing or drum-like sounds or shooting cracks.',
    slab: '30cm + of new snow, or significant drifting, or rain in the last 48 hours.',
    temp: 'Rapid temperature rise to near zero degrees or wet surface snow.',
}

const RidingConditionsTitles = new Map([
    ['snowConditions', 'Snow conditions'],
    ['ridingQuality', 'Riding quality'],
    ['stayedAway', 'We stayed away from'],
    ['rideType', 'We rode'],
    ['weather', 'The day was'],
])

function computeRidingConditions(conditions) {
    return Object.keys(conditions).reduce((children, key) => {
        const {type, prompt, selected, options} = conditions[key]
        const term = RidingConditionsTitles.get(key) || prompt
        let text = null

        switch (type) {
            case 'single':
                if (selected) {
                    children.push(<Term>{term}</Term>)
                    children.push(<Definition>{selected}</Definition>)
                }
                break
            case 'multiple':
                text = trulyKeys(options).join('. ')

                if (text) {
                    children.push(<Term>{term}</Term>)
                    children.push(<Definition>{text}</Definition>)
                }

                break
            default:
                throw new Error(`Prompt of type="${type}" not supported in Quick MIN observation.`)
        }

        return children
    }, [])
}

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

export default function Quick({avalancheConditions, ridingConditions, comment}) {
    return (
        <div>
            <Section title='Information'>
                <List bordered>
                    <Term block>Avalanche conditions</Term>
                    <Definition block>
                        {projectKeys(avalancheConditionsTexts, avalancheConditions).join('. ')}
                    </Definition>
                    {ridingConditions && computeRidingConditions(ridingConditions)}
                </List>
            </Section>
            <Comment>
                {comment}
            </Comment>
        </div>
    )
}
