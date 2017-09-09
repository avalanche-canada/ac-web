import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Tabs.css'

// TODO: Add the arrow
// TODO: Implement the switch to stacked!

export const COMPACT = 'Compact'
export const LOOSE = 'Loose'

HeaderSet.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onActivateItem: PropTypes.func.isRequired,
    theme: PropTypes.oneOf([LOOSE, COMPACT]),
    children: PropTypes.node.isRequired,
}

export function HeaderSet({
    activeIndex,
    onActivateItem,
    theme = COMPACT,
    children,
}) {
    return (
        <ul className={`${styles.HeaderSet} ${styles[theme]}`}>
            {Children.map(children, (child, index) =>
                cloneElement(child, {
                    isActive: activeIndex === index,
                    onActivate() {
                        onActivateItem(index)
                    },
                })
            )}
        </ul>
    )
}

Header.propTypes = {
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export function Header({ onActivate, isActive, children }) {
    return (
        <li
            className={isActive ? styles.ActiveHeader : styles.Header}
            onClick={onActivate}>
            {children}
        </li>
    )
}

PanelSet.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.number.isRequired,
}

export function PanelSet({ children, activeIndex }) {
    return Children.toArray(children)[activeIndex]
}

Panel.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Panel({ children }) {
    return (
        <div className={styles.Panel}>
            {children}
        </div>
    )
}

export default class TabSet extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        activeIndex: PropTypes.number,
    }
    state = {
        activeIndex: 0,
    }
    constructor(props) {
        super(props)

        if (typeof props.activeIndex === 'number') {
            Object.assign(this.state, {
                activeIndex: props.activeIndex,
            })
        }
    }
    componentWillReceiveProps({ activeIndex }) {
        if (
            typeof activeIndex === 'number' &&
            this.state.activeIndex !== activeIndex
        ) {
            this.setState({
                activeIndex,
            })
        }
    }
    handleActivate = activeIndex => this.setState({ activeIndex })
    render() {
        const { children } = this.props
        const { activeIndex } = this.state

        return (
            <div>
                {Children.map(children, child => {
                    if (child.type === PanelSet) {
                        return cloneElement(child, {
                            activeIndex,
                        })
                    } else if (child.type === HeaderSet) {
                        return cloneElement(child, {
                            activeIndex,
                            onActivateItem: this.handleActivate,
                        })
                    } else {
                        return child
                    }
                })}
            </div>
        )
    }
}

ControlledTabSet.propTypes = {
    data: PropTypes.array.isRequired,
    activeIndex: PropTypes.number,
}

export function ControlledTabSet({ data = [], ...props }) {
    return (
        <TabSet {...props}>
            <HeaderSet>
                {data.map((item, index) =>
                    <Header key={index}>
                        {item.header}
                    </Header>
                )}
            </HeaderSet>
            <PanelSet>
                {data.map((item, index) =>
                    <Panel key={index}>
                        {item.content}
                    </Panel>
                )}
            </PanelSet>
        </TabSet>
    )
}
