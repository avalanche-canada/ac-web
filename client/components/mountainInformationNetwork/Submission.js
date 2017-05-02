import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import ImageGallery from '~/components/gallery'
import {Tab, TabSet} from '~/components/tab'
import Observation from './Observation'
import {INCIDENT, NAMES, TYPES, COLORS} from '~/constants/min'
import styles from './MountainInformationNetwork.css'

Submission.propTypes = {
    observations: PropTypes.arrayOf(PropTypes.object).isRequired,
    active: PropTypes.oneOf(TYPES),
    uploads: PropTypes.arrayOf(PropTypes.object).isRequired,
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
                        title: NAMES.get(type),
                        color: COLORS.get(type),
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
            {uploads.length > 0 &&
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
