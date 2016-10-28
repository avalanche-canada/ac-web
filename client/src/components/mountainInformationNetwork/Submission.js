import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} from './types'
import {Tab, TabSet} from 'components/tab'
import Observation from './Observation'
import styles from './MountainInformationNetwork.css'
import * as COLORS from 'components/icons/min/colors'
import ImageGallery from 'react-image-gallery'

const TAB_TITLES = new Map([
    [QUICK, 'Quick'],
    [WEATHER, 'Weather'],
    [SNOWPACK, 'Snowpack'],
    [AVALANCHE, 'Avalanche'],
    [INCIDENT, 'Incident'],
])
const TAB_COLORS = new Map([
    [QUICK, COLORS.QUICK],
    [WEATHER, COLORS.WEATHER],
    [SNOWPACK, COLORS.SNOWPACK],
    [AVALANCHE, COLORS.AVALANCHE],
    [INCIDENT, COLORS.INCIDENT],
])
const TYPES = [QUICK, AVALANCHE, SNOWPACK, WEATHER, INCIDENT]

Submission.propTypes = {
    observations: PropTypes.arrayOf(PropTypes.object).isRequired,
    active: PropTypes.oneOf(TYPES),
}

function reducer(observations, {obtype, ob}) {
    return observations.set(obtype, ob)
}
function toGalleryItem(upload) {
    return {
        original: `/api/min/uploads/${upload}`
    }
}

function Submission({uploads = [], observations = [], active = INCIDENT}) {
    const observationsByType = observations.reduce(reducer, new Map())
    const activeIndex = TYPES.indexOf(active)

    return (
        <div>
            <TabSet activeIndex={activeIndex} arrow >
                {TYPES.map(type => {
                    const tab = {
                        key: type,
                        title: TAB_TITLES.get(type),
                        color: TAB_COLORS.get(type),
                        disabled: !observationsByType.has(type),
                    }

                    return (
                        <Tab {...tab}>
                            {tab.disabled ||
                                <Observation type={type} observation={observationsByType.get(type)} />
                            }
                        </Tab>
                    )
                })}
            </TabSet>
            {uploads.length > 0 &&
                <ImageGallery
                    items={uploads.map(toGalleryItem)}
                    showBullets
                    showThumbnails={false} />
            }
        </div>
    )
}

export default CSSModules(Submission, styles)
