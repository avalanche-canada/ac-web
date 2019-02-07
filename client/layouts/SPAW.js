import React, { PureComponent, memo } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import Highlight, { DANGER } from 'components/highlight'
import { Link } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { spaw } from 'prismic/params'
import { Banner } from 'components/application'
import { SessionStorage } from 'services/storage'
import { isTouchable } from 'utils/device'

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
                        <p>
                            {description[0].text}{' '}
                            {isTouchable ? 'Tap' : 'Click'} for more information
                        </p>
                    </Link>
                </Highlight>
            </Banner>
        )
    }
    render() {
        return <Document {...spaw()}>{this.children}</Document>
    }
}

BaseRegion.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

function BaseRegion({ name, children }) {
    return (
        <Document {...spaw()}>
            {({ document }) =>
                document && document.data[camelCase(name)] === 'Yes'
                    ? children({ document })
                    : null
            }
        </Document>
    )
}

export const Region = memo(BaseRegion)
