import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Section as Base } from 'components/page'
import { StructuredText } from 'prismic/components/base'

export default class Section extends PureComponent {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            header: PropTypes.object,
            content: PropTypes.arrayOf(PropTypes.object).isRequired,
        }).isRequired,
    }
    render() {
        const { content, header } = this.props.nonRepeat

        return (
            <Base title={<StructuredText value={header} />}>
                <StructuredText value={content} />
            </Base>
        )
    }
}
