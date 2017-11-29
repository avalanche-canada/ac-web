import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SUBTILE } from './kinds'
import Button from './Button'
import { Remove, Add, ExpandMore, ExpandLess } from 'components/icons'

const ICONS = new Map([
    [true, new Map([[true, <ExpandLess />], [false, <ExpandMore />]])],
    [false, new Map([[true, <Remove />], [false, <Add />]])],
])

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
        const icon = ICONS.get(chevron).get(expanded)

        return <Button kind={SUBTILE} icon={icon} {...props} />
    }
}
