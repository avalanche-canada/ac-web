import React, { Fragment, createContext } from 'react'
import PropTypes from 'prop-types'
import MetadataComponent from './Metadata'
import GalleryComponent from './Gallery'
import TabSetComponent from './TabSet'
import { shareUrl } from 'utils/min'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import { ContextMap } from 'components/page'
import { Marker } from 'components/map'
import min from 'components/icons/min/min-pin.png'
import minWithIncident from 'components/icons/min/min-pin-with-incident.png'
import { INCIDENT } from 'constants/min'

export Sidebar from './Sidebar'

const { Provider, Consumer } = createContext()

export function Submission({ children, value }) {
    return (
        <Provider value={value}>
            {children || (
                <Fragment>
                    <Metadata />
                    <TabSet />
                    <Gallery />
                </Fragment>
            )}
        </Provider>
    )
}

export function TabSet() {
    return (
        <Consumer>
            {report =>
                report && Array.isArray(report.obs) ? (
                    <TabSetComponent observations={report.obs} />
                ) : null
            }
        </Consumer>
    )
}

export function Gallery() {
    return (
        <Consumer>
            {report =>
                report && Array.isArray(report.uploads) ? (
                    <GalleryComponent images={report.uploads} />
                ) : null
            }
        </Consumer>
    )
}

Metadata.propTypes = {
    shareable: PropTypes.bool,
}

export function Metadata(props) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <MetadataComponent
                        shareUrl={props.shareable && shareUrl(report.subid)}
                        submittedOn={report.datetime}
                        submittedBy={report.user}
                        latitude={report.latlng[0]}
                        longitude={report.latlng[1]}
                    />
                ) : null
            }
        </Consumer>
    )
}

export function Map() {
    return (
        <Consumer>
            {report => {
                if (!report) {
                    return null
                }

                const [latitude, longitude] = report.latlng
                const center = new mapbox.LngLat(longitude, latitude)
                const withIncident = report.obs.some(hasIncident)
                const element = createElement({
                    title: report.title,
                    src: withIncident ? minWithIncident : min,
                })

                return (
                    <ContextMap center={center} zoom={8}>
                        <Marker element={element} lngLat={center} />
                    </ContextMap>
                )
            }}
        </Consumer>
    )
}

// Utils
function createElement(props) {
    return Object.assign(document.createElement('img'), props, {
        width: 20,
    })
}
function hasIncident(observation) {
    return observation.obtype === INCIDENT
}
