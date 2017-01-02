import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import ImageGallery from 'react-image-gallery'
import {Tab, TabSet} from 'components/tab'
import Observation from './Observation'
import * as Colors from 'components/icons/min/colors'
import * as Types from './types'
import styles from './MountainInformationNetwork.css'

const {QUICK, WEATHER, SNOWPACK, AVALANCHE, INCIDENT} = Types

const TAB_TITLES = new Map([
    [QUICK, 'Quick'],
    [WEATHER, 'Weather'],
    [SNOWPACK, 'Snowpack'],
    [AVALANCHE, 'Avalanche'],
    [INCIDENT, 'Incident'],
])
const TAB_COLORS = new Map([
    [QUICK, Colors.QUICK],
    [WEATHER, Colors.WEATHER],
    [SNOWPACK, Colors.SNOWPACK],
    [AVALANCHE, Colors.AVALANCHE],
    [INCIDENT, Colors.INCIDENT],
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

function Submission({observations = [], uploads = [], active = INCIDENT}) {
    observations = observations.reduce(reducer, new Map())

    return (
        <div>
            <TabSet arrow activeIndex={TYPES.indexOf(active)}>
                {TYPES.map(type => {
                    const tab = {
                        key: type,
                        title: TAB_TITLES.get(type),
                        color: TAB_COLORS.get(type),
                        disabled: !observations.has(type),
                    }

                    return (
                        <Tab {...tab}>
                            {tab.disabled ||
                                <Observation
                                    type={type}
                                    observation={observations.get(type)} />
                            }
                        </Tab>
                    )
                })}
            </TabSet>
            {uploads.length > 0 &&
                <ImageGallery
                    items={uploads.map(toGalleryItem)}
                    showBullets={uploads.length > 1}
                    showPlayButton={uploads.length > 1}
                    showThumbnails={false} />
            }
        </div>
    )
}

export default CSSModules(Submission, styles)
