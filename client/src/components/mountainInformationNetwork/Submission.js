import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from './types'
import {Tab, TabSet} from 'components/tab'
import Observation from './Observation'
import styles from './MountainInformationNetwork.css'
import * as COLORS from 'components/icons/min/colors'

const Titles = new Map([
    [QUICK, 'Quick'],
    [WEATHER, 'Weather'],
    [SNOWPACK, 'Snowpack'],
    [AVALANCHE, 'Avalanche'],
    [INCIDENT, 'Incident'],
])
const Colors = new Map([
    [QUICK, COLORS.QUICK],
    [WEATHER, COLORS.WEATHER],
    [SNOWPACK, COLORS.SNOWPACK],
    [AVALANCHE, COLORS.AVALANCHE],
    [INCIDENT, COLORS.INCIDENT],
])
const TYPES = [QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT]

Submission.propTypes = {
    observations: PropTypes.arrayOf(PropTypes.object).isRequired,
    active: PropTypes.oneOf(TYPES),
}

function reducer(observations, {obtype, ob}) {
    return observations.set(obtype, ob)
}

function Submission({observations = [], active = QUICK}) {
    const observationsByType = observations.reduce(reducer, new Map())
    const activeIndex = TYPES.indexOf(active)

    return (
        <TabSet activeIndex={activeIndex} arrow >
            {TYPES.map(type => {
                const disabled = !observationsByType.has(type)
                const tab = {
                    key: type,
                    title: Titles.get(type),
                    color: Colors.get(type),
                    disabled,
                }

                return (
                    <Tab {...tab}>
                        {disabled ||
                            <Observation type={type} observation={observationsByType.get(type)} />
                        }
                    </Tab>
                )
            })}
        </TabSet>
    )
}

export default CSSModules(Submission, styles)
