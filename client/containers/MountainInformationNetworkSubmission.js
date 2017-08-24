import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    Page,
    Header,
    Main,
    Content,
    Aside,
    ContextMap,
} from '~/components/page'
import { Item } from '~/components/sidebar'
import { Muted, Error } from '~/components/text'
import { mountainInformationNetworkSubmission } from '~/containers/connectors'
import {
    Submission,
    Metadata,
    Sidebar,
} from '~/components/mountainInformationNetwork'
import { Marker } from '~/components/map'
import mapbox from '~/services/mapbox/map'
import min from '~/components/icons/min/min-pin.png'

function createElement(props) {
    return Object.assign(document.createElement('img'), {
        ...props,
        src: min,
    })
}

const MARKER_OPTIONS = {
    offset: [-25, -25],
}

Container.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    mapLink: PropTypes.string.isRequired,
    report: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    metadata: PropTypes.shape({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
    }),
    props: PropTypes.object,
}

function Container({
    title = 'Mountain Information Network',
    mapLink,
    metadata,
    isLoading,
    isError,
    props,
}) {
    const center =
        metadata && new mapbox.LngLat(metadata.longitude, metadata.latitude)

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {metadata && <Metadata {...metadata} />}
                    {center &&
                        <ContextMap center={center} zoom={8}>
                            <Marker
                                element={createElement({ title })}
                                lngLat={center}
                                options={MARKER_OPTIONS}
                            />
                        </ContextMap>}
                    {isError &&
                        <Error>Error happened while loading submission.</Error>}
                    {isLoading
                        ? <Muted>Loading submission...</Muted>
                        : <Submission {...props} />}
                </Main>
                <Aside>
                    <Sidebar>
                        <Item>
                            <Link to={mapLink}>
                                See this submission on the main map
                            </Link>
                        </Item>
                    </Sidebar>
                </Aside>
            </Content>
        </Page>
    )
}

export default mountainInformationNetworkSubmission(Container)
