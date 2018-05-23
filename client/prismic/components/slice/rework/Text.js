import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'

export default class Text extends PureComponent {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.object).isRequired,
        }).isRequired,
    }
    render() {
        return <StructuredText value={this.props.nonRepeat.content} />
    }
}
