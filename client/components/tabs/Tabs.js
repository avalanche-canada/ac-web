import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import HeaderSet from './HeaderSet'
import PanelSet from './PanelSet'
import styles from './Tabs.css'

// TODO: HOOKS

export default class Tabs extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        theme: PropTypes.oneOf(['LOOSE', 'COMPACT']),
        defaultActiveTab: PropTypes.number,
        activeTab: PropTypes.number,
        onTabChange: PropTypes.func,
    }
    static defaultProps = {
        theme: 'COMPACT',
        onTabChange() {},
    }
    state = {
        activeTab: this.props.activeTab || this.props.defaultActiveTab || 0,
    }
    handleTabChange = activeTab => {
        this.setState({ activeTab }, () => {
            this.props.onTabChange(activeTab)
        })
    }
    componentDidUpdate() {
        const { activeTab } = this.props

        if (
            typeof activeTab === 'number' &&
            activeTab !== this.state.activeTab
        ) {
            this.setState({ activeTab })
        }
    }
    renderChild = child => {
        const { activeTab } = this.state

        switch (child.type) {
            case HeaderSet:
                return cloneElement(child, {
                    activeTab,
                    onTabChange: this.handleTabChange,
                    theme: child.props.theme || this.props.theme,
                })
            case PanelSet:
                return cloneElement(child, { activeTab })
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
