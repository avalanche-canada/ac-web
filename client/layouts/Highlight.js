import React, { PureComponent } from 'react'
import Component from 'components/highlight'
import { Banner } from 'components/application'
import { Link, StructuredText } from 'prismic/components/base'
import { Highlight as Container } from 'prismic/containers'
import { SessionStorage } from 'services/storage'

// Constants
const STORAGE_KEY = 'highlight-hidden'

export default class Highlight extends PureComponent {
    storage = SessionStorage.create()
    state = {
        hidden: this.storage.get(STORAGE_KEY),
    }
    handleDismiss = () => {
        this.setState({ hidden: true }, () => {
            this.storage.set(STORAGE_KEY, true)
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
                <Component
                    style={document.style}
                    onDismiss={this.handleDismiss}
                    dismissable>
                    {link ? <Link {...link}>{content}</Link> : content}
                </Component>
            </Banner>
        )
    }
    render() {
        return <Container>{this.children}</Container>
    }
}
