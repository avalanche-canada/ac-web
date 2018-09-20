import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Base, { DANGER, INFO, WARNING, SUCCESS } from 'components/alert'
import { StructuredText } from 'prismic/components/base'

export default class Alert extends PureComponent {
    static propTypes = {
        nonRepeat: PropTypes.shape({
            type: PropTypes.oneOf(['Warning', 'Information', 'Danger'])
                .isRequired,
            content: PropTypes.arrayOf(PropTypes.object).isRequired,
        }).isRequired,
    }
    render() {
        const { type, content } = this.props.nonRepeat

        return (
            <Base type={TYPES.get(type)}>
                <StructuredText value={content} />
            </Base>
        )
    }
}

// Constants
const TYPES = new Map([
    ['Warning', WARNING],
    ['Information', INFO],
    ['Danger', DANGER],
    ['Success', SUCCESS],
])
