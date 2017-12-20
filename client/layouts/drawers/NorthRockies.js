import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ForecastRegion from 'containers/ForecastRegion'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import Sponsor from 'layouts/Sponsor'
import { Navbar, Header, Container, Body, Close } from 'components/page/drawer'
import DisplayOnMap from './DisplayOnMap'
import bboxPolygon from '@turf/bbox-polygon'

export default class NorthRockies extends PureComponent {
    static propTypes = {
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    locate = ({ region }) => {
        if (!region) {
            return null
        }

        const { onLocateClick } = this.props
        function handleLocateClick() {
            const bbox = region.get('bbox').toArray()

            onLocateClick(bboxPolygon(bbox))
        }

        return <DisplayOnMap onClick={handleLocateClick} />
    }
    render() {
        return (
            <Container>
                <Navbar>
                    <Sponsor label={null} />
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <Header subject="Avalanche Forecast">
                    <h1>
                        <Link to="/forecasts/north-rockies">North Rockies</Link>
                        <ForecastRegion id="north-rockies">
                            {this.locate}
                        </ForecastRegion>
                    </h1>
                </Header>
                <Body>
                    <NorthRockiesBlogFeed />
                </Body>
            </Container>
        )
    }
}
