import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Page, Header, Main, Content, Headline} from 'components/page'
import {Muted, Error} from 'components/misc'
import {mountainInformationNetworkSubmission} from 'containers/connectors'
import {Submission, Metadata} from 'components/mountainInformationNetwork'
import {Map, Marker, NavigationControl} from 'components/map'
import mapbox from 'services/mapbox/map'
import min from 'components/icons/min/min-pin.svg'

const MAP_STYLE = {
    height: 250
}
function createElement(props) {
    return Object.assign(document.createElement('img'), {
        ...props,
        src: min,
    })
}

Container.propTypes = {
    title: PropTypes.string.isRequired,
    report: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
}

function Container({
    title = 'Mountain Information Network',
    metadata,
    isLoading,
    isError,
    props,
    messages,
}) {
    const center = metadata ? new mapbox.LngLat(
        metadata.longitude,
        metadata.latitude
    ) : null

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    {metadata && <Metadata {...metadata} />}
                    {isLoading && <Muted>Loading submission...</Muted>}
                    {isError && <Error>Error happened while loading submission.</Error>}
                    {false &&
                        <Map style='2016' center={center} zoom={8} containerStyle={MAP_STYLE}>
                            <Marker element={createElement({title})} lngLat={center} />
                            <NavigationControl />
                        </Map>
                    }
                    {props && <Submission {...props} />}
                </Main>
            </Content>
        </Page>
    )
}

export default mountainInformationNetworkSubmission(Container)
