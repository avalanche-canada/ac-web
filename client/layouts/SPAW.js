import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import Highlight, { DANGER } from 'components/highlight'
import { Link } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { spaw } from 'prismic/params'
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

        const { link, description } = document.data

        return (
            <Banner>
                <Highlight
                    type={DANGER}
                    onDismiss={this.handleDismiss}
                    dismissable>
                    <Link {...link}>
                        <p>{description[0].text} Click for more information</p>
                    </Link>
                </Highlight>
            </Banner>
        )
    }
    render() {
        return <Document {...spaw()}>{this.children}</Document>
    }
}

export class Region extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    children = ({ document }) =>
        document && document.data[camelCase(this.props.name)] === 'Yes'
            ? this.props.children({ document })
            : null
    render() {
        return <Document {...spaw()}>{this.children}</Document>
    }
}
