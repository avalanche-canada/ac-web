import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import HeaderSet from './HeaderSet'
import PanelSet from './PanelSet'
import styles from './Tabs.css'
import identity from 'lodash/identity'

export default class Tabs extends PureComponent {
    static propTypes = {
        children: PropTypes.element.isRequired,
        theme: PropTypes.oneOf(['LOOSE', 'COMPACT']),
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
                    theme: child.props.theme || this.props.theme,
                })
            case PanelSet:
                return cloneElement(child, { activeIndex })
            default:
                throw new Error('Wrong child provided to Tabs components')
        }
    }
    render() {
        return (
            <div className={styles.Tabs}>
                {Children.map(this.props.children, this.renderChild)}
            </div>
        )
    }
}
