import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Sponsor as Component, Status } from 'components/misc'
import { Sponsor as Container } from 'prismic/containers'

// TODO: move to layouts

export default class Sponsor extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
    }
    renderChildren = ({ status, document = {} }) => {
        // TODO: Perhaps container could provide the logo value
        const { name, image229, url } = document.data || {}

        return (
            <Component
                label={this.props.label}
                name={name}
                logo={image229}
                url={url}>
                {status.isLoading && <Status isLoading />}
            </Component>
        )
    }
    render() {
        return (
            <Container name={this.props.name}>{this.renderChildren}</Container>
        )
    }
}
