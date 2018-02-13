import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Page, Header, Main, Content, Aside, ContextMap } from 'components/page'
import { Item } from 'components/sidebar'
import { Status } from 'components/misc'
import Container from 'containers/MountainInformationNetworkSubmission'
import { MountainInformationNetworkSubmission as Schema } from 'api/schemas'
import {
    Submission,
    Metadata,
    Sidebar,
} from 'components/mountainInformationNetwork'
import { Marker } from 'components/map'
import mapbox from 'services/mapbox/map'
import min from 'components/icons/min/min-pin.png'
import minWithIncident from 'components/icons/min/min-pin-with-incident.png'
import { INCIDENT } from 'constants/min'

export default class Layout extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    get link() {
        return `/map?panel=${Schema.key}/${this.props.id}`
    }
    renderMap(report) {
        const title = report.get('title')
        const [latitude, longitude] = report.get('latlng')
        const center = new mapbox.LngLat(longitude, latitude)
        const withIncident = report.get('obs').some(hasIncident)
        const element = createElement({
            title,
            src: withIncident ? minWithIncident : min,
        })

        return (
            <ContextMap center={center} zoom={8}>
                <Marker element={element} lngLat={center} />
            </ContextMap>
        )
    }
    renderHeader(report) {
        const title = report
            ? report.get('title')
            : 'Mountain Information Network'

        return <Header title={title} />
    }
    children = ({ status, report }) => [
        this.renderHeader(report),
        <Content>
            <Main>
                <Status {...status} />
                {report && <Metadata report={report} />}
                {report && this.renderMap(report)}
                {report && <Submission report={report} />}
            </Main>
            <Aside>
                <Sidebar>
                    <Item>
                        <Link to={this.link}>
                            See this submission on the main map
                        </Link>
                    </Item>
                </Sidebar>
            </Aside>
        </Content>,
    ]
    render() {
        return (
            <Page>
                <Container id={this.props.id}>{this.children}</Container>
            </Page>
        )
    }
}

// Utils
function createElement(props) {
    return Object.assign(document.createElement('img'), props, {
        width: 20,
    })
}
function hasIncident(observation) {
    return observation.get('obtype') === INCIDENT
}
