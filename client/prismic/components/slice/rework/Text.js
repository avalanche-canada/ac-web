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
        const { content } = this.props.nonRepeat

        return <StructuredText value={content} />
    }
}
