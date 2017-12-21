import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'components/misc'
import { StructuredText } from 'prismic/components/base'
import { WeatherTutorial as Container } from 'prismic/containers'

export default class Tutorial extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
    }
    children = ({ status, document }) => {
        // TODO: Use Fragment once available
        return [
            <Status {...status} />,
            document && <StructuredText value={document.data.tutorial} />,
        ].filter(Boolean)
    }
    render() {
        return <Container uid={this.props.uid}>{this.children}</Container>
    }
}
