import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'components/misc'
import { StructuredText } from 'prismic/components/base'
import { WeatherTutorial as Container } from 'prismic/containers'

const MESSAGES = {
    isLoading: 'Loading tutorial...',
    isError: 'Error happened while loading tutorial...',
}

export default class Tutorial extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
    }
    renderer = ({ status, tutorial }) => {
        // TODO: Use Fragment once available
        return [
            <Status {...status} messages={MESSAGES} />,
            tutorial && <StructuredText value={tutorial.tutorial} />,
        ].filter(Boolean)
    }
    render() {
        return <Container uid={this.props.uid}>{this.renderer}</Container>
    }
}
