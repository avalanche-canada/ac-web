import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import HeaderSet from './HeaderSet'
import PanelSet from './PanelSet'
import styles from './Tabs.css'

export default class Tabs extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        theme: PropTypes.oneOf(['LOOSE', 'COMPACT']),
        activeTab: PropTypes.number,
        onTabChange: PropTypes.func,
    }
    static defaultProps = {
        theme: 'COMPACT',
        onTabChange() {},
    }
    constructor(props) {
        super(props)

        this.state = {
            activeTab: props.activeTab || 0,
        }
    }
    handleTabChange = activeTab => {
        this.setState({ activeTab }, () => {
            this.props.onTabChange(activeTab)
        })
    }
    componentWillReceiveProps({ activeTab }) {
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
