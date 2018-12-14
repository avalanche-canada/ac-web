import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Region } from 'containers/features'
import { NorthRockies } from 'layouts/feed'
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

export default class NorthRockiesLayout extends PureComponent {
    static propTypes = {
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    handleLocateClick = () => {
        const { onLocateClick } = this.props

        onLocateClick(utils.geometry(this.region))
    }
    locate({ data }) {
        if (!data) {
            return null
        }

        this.region = data

        return <DisplayOnMap onClick={this.handleLocateClick} />
    }
    renderSPAW = ({ link }) => {
        const style = {
            flex: 1,
        }

        return <SPAWComponent link={link} style={style} />
    }
    render() {
        const name = 'north-rockies'

        return (
            <Container>
                <Navbar>
                    <SPAW name={name}>{this.renderSPAW}</SPAW>
                    <Sponsor label={null} />
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <Header subject="Avalanche Forecast">
                    <h1>
                        <Link to={`/forecasts/${name}`}>North Rockies</Link>
                        <Region name={name}>
                            {props => this.locate(props)}
                        </Region>
                    </h1>
                </Header>
                <Body>
                    <Content>
                        <NorthRockies />
                    </Content>
                </Body>
            </Container>
        )
    }
}
