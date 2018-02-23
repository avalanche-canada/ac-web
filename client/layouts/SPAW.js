import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import Highlight, { DANGER } from 'components/highlight'
import { Link, StructuredText } from 'prismic/components/base'
import { SPAW as Container } from 'prismic/containers'
import { Banner } from 'components/application'
import { SessionStorage } from 'services/storage'

export default class SPAW extends PureComponent {
    storage = SessionStorage.create()
    state = {
        hidden: this.storage.get('spaw-hidden'),
    }
    handleDismiss = () => {
        this.setState({ hidden: true }, () => {
            this.storage.set('spaw-hidden', true)
        })
    }
    children = ({ document }) => {
        if (!document || this.state.hidden) {
            return null
        }

        const { link } = document
        const content = <StructuredText value={document.description} />

        return (
            <Banner>
                <Highlight
                    style={DANGER}
                    onDismiss={this.handleDismiss}
                    dismissable>
                    {link ? <Link {...link}>{content}</Link> : content}
                </Highlight>
            </Banner>
        )
    }
    render() {
        return <Container>{this.children}</Container>
    }
}

export class Region extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    children = ({ document }) =>
        document && document[camelCase(this.props.name)] === 'Yes'
            ? this.props.children({ document })
            : null
    render() {
        return <Container>{this.children}</Container>
    }
}
