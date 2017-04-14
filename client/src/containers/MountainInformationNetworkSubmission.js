import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Page, Header, Main, Content, Headline, ContextMap} from '~/components/page'
import {Muted, Error} from '~/components/misc'
import {mountainInformationNetworkSubmission} from '~/containers/connectors'
import {Submission, Metadata} from '~/components/mountainInformationNetwork'
import {Marker} from '~/components/map'
import mapbox from '~/services/mapbox/map'
import min from '~/components/icons/min/min-pin.svg'

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
                    {false &&
                        <ContextMap center={center} zoom={8}>
                            <Marker element={createElement({title})} lngLat={center} />
                        </ContextMap>
                    }
                    {isError && <Error>Error happened while loading submission.</Error>}
                    {isLoading ?
                        <Muted>Loading submission...</Muted> :
                        <Submission {...props} />
                    }
                </Main>
            </Content>
        </Page>
    )
}

export default mountainInformationNetworkSubmission(Container)
