import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Header, Container, Body, Navbar, Close } from 'components/page/drawer'
import { Status } from 'components/misc'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import * as Containers from 'prismic/containers'
import { StructuredText } from 'prismic/components/base'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { geometry } from '@turf/helpers'

export default class FatalAccident extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderHeader({ title, location }) {
        const { onLocateClick } = this.props
        function handleLocateClick() {
            const { longitude, latitude } = location

            onLocateClick(geometry('Point', [longitude, latitude]))
        }

        return (
            <h1>
                {title}
                <DisplayOnMap onClick={handleLocateClick} />
            </h1>
        )
    }
    renderContent({ content }) {
        return <StructuredText value={content} />
    }
    renderMetadata({ dateOfAccident }) {
        return (
            <Metadata>
                <Entry term="Accident date">
                    <DateTime value={dateOfAccident} />
                </Entry>
            </Metadata>
        )
    }
    createMessages(report) {
        return {
            isError:
                'An error happened while loading the fatal recreational accident.',
            isLoading: 'Loading fatal recreational accident...',
            isLoaded: report
                ? null
                : `Fatal recreational accident "${
                      this.props.id
                  }" is not available anymore.`,
        }
    }
    children = ({ document, status }) => [
        <Header subject="Fatal Recreational Accident">
            {document && this.renderHeader(document.data)}
        </Header>,
        <Body>
            <Status {...status} messages={this.createMessages(document)} />
            {document && this.renderMetadata(document.data)}
            {document && this.renderContent(document.data)}
        </Body>,
    ]
    render() {
        return (
            <Container>
                <Navbar>
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <Containers.FatalAccident id={this.props.id}>
                    {this.children}
                </Containers.FatalAccident>
            </Container>
        )
    }
}
