import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SUBTILE } from './kinds'
import Button from './Button'
import { Remove, Add, ExpandMore, ExpandLess } from 'components/icons'

export default class Expand extends PureComponent {
    static propTypes = {
        expanded: PropTypes.bool.isRequired,
        chevron: PropTypes.bool,
    }
    static defaultProps = {
        expanded: false,
        chevron: false,
    }
    render() {
        const { chevron, expanded, ...props } = this.props

        return (
            <Button kind={SUBTILE} {...props}>
                {ICONS.get(chevron).get(expanded)}
            </Button>
        )
    }
}

const ICONS = new Map([
    [true, new Map([[true, <ExpandLess />], [false, <ExpandMore />]])],
    [false, new Map([[true, <Remove />], [false, <Add />]])],
])
