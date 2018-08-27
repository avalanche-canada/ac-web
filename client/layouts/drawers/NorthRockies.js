import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as containers from 'containers/forecasting'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { SPAW as SPAWComponent } from 'components/misc'
import { Region as SPAW } from 'layouts/SPAW'
import Sponsor from 'layouts/Sponsor'
import {
    Container,
    Navbar,
    Header,
    Body,
    Content,
    Close,
} from 'components/page/drawer'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as utils from 'utils/region'

export default class NorthRockies extends PureComponent {
    static propTypes = {
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    locate({ data }) {
        if (!data) {
            return null
        }

        const { onLocateClick } = this.props
        function handleLocateClick() {
            onLocateClick(utils.geometry(data))
        }

        return <DisplayOnMap onClick={handleLocateClick} />
    }
    renderSPAW = ({ link }) => {
        const style = {
            flex: 1,
        }

        return <SPAWComponent link={link} style={style} />
    }
    render() {
        return (
            <Container>
                <Navbar>
                    <SPAW name="north-rockies">{this.renderSPAW}</SPAW>
                    <Sponsor label={null} />
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <Header subject="Avalanche Forecast">
                    <h1>
                        <Link to="/forecasts/north-rockies">North Rockies</Link>
                        <containers.Region name="north-rockies">
                            {props => this.locate(props)}
                        </containers.Region>
                    </h1>
                </Header>
                <Body>
                    <Content>
                        <NorthRockiesBlogFeed />
                    </Content>
                </Body>
            </Container>
        )
    }
}
