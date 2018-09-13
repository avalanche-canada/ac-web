import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Container,
    Body,
    Content,
    Navbar,
    Close,
} from 'components/page/drawer'
import { Loading, Muted } from 'components/text'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { Document } from 'prismic/containers'
import { fatal } from 'prismic/params'
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
        const { onLocateClick, id } = this.props
        function handleLocateClick() {
            const { longitude, latitude } = location

            onLocateClick(geometry('Point', [longitude, latitude]))
        }

        return (
            <h1>
                <span>{title}</span>
                <DisplayOnMap key={id} onClick={handleLocateClick} />
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
    renderChildren = ({ document, loading }) => (
        <Container>
            <Navbar>
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Fatal Recreational Accident">
                {document && this.renderHeader(document.data)}
            </Header>
            <Body>
                <Content>
                    {loading ? (
                        <Loading>
                            Loading fatal recreational accident...
                        </Loading>
                    ) : document ? (
                        <Fragment>
                            {this.renderMetadata(document.data)}
                            {this.renderContent(document.data)}
                        </Fragment>
                    ) : (
                        <Muted>
                            {`Fatal recreational accident "${
                                this.props.id
                            }" is not available anymore.`}
                        </Muted>
                    )}
                </Content>
            </Body>
        </Container>
    )
    render() {
        return (
            <Document {...fatal.accident(this.props.id)}>
                {this.renderChildren}
            </Document>
        )
    }
}
