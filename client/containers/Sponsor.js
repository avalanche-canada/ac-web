import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Sponsor as Component, Status } from 'components/misc'
import { Sponsor as Container } from 'prismic/containers'
import get from 'lodash/get'

// TODO: move to layouts

export default class Sponsor extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
    }
    renderChildren = ({ status, document }) => (
        <Component label={this.props.label} {...get(document, 'data', {})}>
            {status.isLoading && <Status isLoading />}
        </Component>
    )
    render() {
        return (
            <Container name={this.props.name}>{this.renderChildren}</Container>
        )
    }
}
