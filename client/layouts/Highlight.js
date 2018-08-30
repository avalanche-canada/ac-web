import React, { PureComponent } from 'react'
import Component from 'components/highlight'
import { Banner } from 'components/application'
import { Link, StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/new-containers'
import { highlight } from 'prismic/params'
import { SessionStorage } from 'services/storage'

// Constants
const STORAGE_KEY = 'highlight-hidden'

export default class Highlight extends PureComponent {
    storage = SessionStorage.create()
    state = {
        hidden: this.storage.get(STORAGE_KEY, false),
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

        const { link, description, style } = document.data
        const content = <StructuredText value={description} />

        return (
            <Banner>
                <Component
                    style={style}
                    onDismiss={this.handleDismiss}
                    dismissable>
                    {link ? <Link {...link}>{content}</Link> : content}
                </Component>
            </Banner>
        )
    }
    render() {
        return <Document {...highlight()}>{this.children}</Document>
    }
}
