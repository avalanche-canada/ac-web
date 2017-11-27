import React, { Children, cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Index } from 'react-powerplug'

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
    renderer = ({ index, setIndex }) => {
        const { showTravelAdvice, expandable } = this.props
        function cloneBanner(banner, i) {
            return cloneElement(banner, {
                showTravelAdvice,
                expandable,
                expanded: index === i,
                onExpandClick() {
                    setIndex(index === i ? null : i)
                },
            })
        }

        return Children.map(this.props.children, cloneBanner)
    }
    render() {
        return (
            <g>
                <Index initial={null}>{this.renderer}</Index>
            </g>
        )
    }
}
