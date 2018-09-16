import React, { Children, cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Value } from 'react-powerplug'

export default class BannerSet extends PureComponent {
    static propTypes = {
        showTravelAdvice: PropTypes.bool,
        expandable: PropTypes.bool,
        children: PropTypes.node,
    }
    static defaultProps = {
        showTravelAdvice: false,
        expandable: false,
    }
    renderer = ({ value, set }) => {
        const { showTravelAdvice, expandable } = this.props
        function cloneBanner(banner, i) {
            return cloneElement(banner, {
                showTravelAdvice,
                expandable,
                expanded: value === i,
                onExpandClick() {
                    set(value === i ? null : i)
                },
            })
        }

        return Children.map(this.props.children, cloneBanner)
    }
    render() {
        return (
            <g>
                <Value initial={null}>{this.renderer}</Value>
            </g>
        )
    }
}
