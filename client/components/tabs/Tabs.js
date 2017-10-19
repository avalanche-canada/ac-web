import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import HeaderSet from './HeaderSet'
import PanelSet from './PanelSet'
import styles from './Tabs.css'
import identity from 'lodash/identity'

export default class Tabs extends PureComponent {
    static propTypes = {
        children: PropTypes.element.isRequired,
        theme: PropTypes.oneOf(['LOOSE']),
        activeIndex: PropTypes.number,
        onActiveIndexChange: PropTypes.func,
    }
    static defaultProps = {
        theme: 'COMPACT',
        activeIndex: 0,
        onActiveIndexChange: identity,
    }
    constructor(props) {
        super(props)

        this.styles = classnames.bind(styles)
        this.state = {
            activeIndex: props.activeIndex,
        }
    }
    handleActiveIndexChange = activeIndex => {
        this.setState({ activeIndex }, () => {
            this.props.onActiveIndexChange(activeIndex)
        })
    }
    componentWillReceiveProps({ activeIndex }) {
        this.setState({ activeIndex })
    }
    renderChild = child => {
        const { activeIndex } = this.state

        switch (child.type) {
            case HeaderSet:
                return cloneElement(child, {
                    activeIndex,
                    onActiveIndexChange: this.handleActiveIndexChange,
                })
            case PanelSet:
                return cloneElement(child, { activeIndex })
            default:
                throw new Error('Wrong child provided to Tabs components')
        }
    }
    render() {
        const { theme } = this.props
        const classNames = this.styles({
            Tabs: true,
            Loose: theme === 'LOOSE',
            Compact: theme === 'COMPACT',
        })

        return (
            <div className={classNames}>
                {Children.map(this.props.children, this.renderChild)}
            </div>
        )
    }
}
