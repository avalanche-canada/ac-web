import React, { Component, PropTypes, Children } from 'react'
import CSSModules from 'react-css-modules'
import Panel from './Panel'
import Header from './Header'
import styles from './Tab.css'
import {ExpandLess, ExpandMore} from 'components/icons'
import Button, {INCOGNITO} from 'components/button'

function toArray(children) {
	return Children.toArray(children).filter(tab => !!tab)
}

function K() {}

export const COMPACT = 'Compact'
export const LOOSE = 'Loose'

@CSSModules(styles, {allowMultiple: true})
export default class TabSet extends Component {
	static propTypes = {
		activeIndex: PropTypes.number,
		onActivate: PropTypes.func,
        theme: PropTypes.oneOf([LOOSE, COMPACT]),
	}
    static childContextTypes = {
        theme: PropTypes.oneOf([LOOSE, COMPACT]),
    }
	static defaultProps = {
		activeIndex: 0,
        onActivate: K,
        theme: COMPACT,
	}
    state = {
        opened: false
    }
	constructor(props, ...args) {
	  super(props, ...args)

	  this.state.activeIndex = props.activeIndex
	}
	get activeIndex() {
		return this.state.activeIndex
	}
	set activeIndex(activeIndex) {
		this.setState({ activeIndex }, this.handleActivate)
	}
	get tabs() {
		return toArray(this.props.children)
	}
    get opened() {
        return this.state.opened
    }
    set opened(opened) {
        this.setState({opened})
    }
    getChildContext() {
        return {
            theme: this.props.theme
        }
    }
	handleActivate = () => {
        this.opened = false
		this.props.onActivate(this.state.activeIndex)
	}
	componentWillReceiveProps({ activeIndex, children }) {
		if (typeof activeIndex !== 'number') {
			return
		}

		const {length} = toArray(children)

		this.activeIndex = Math.min(activeIndex, length - 1)
	}
    handleExpandClick = event => {
        event.stopPropagation()

        this.opened = !this.opened
    }
	renderTabHeader(tab, index) {
        const expanded = this.opened
        const active = index === this.activeIndex
        const handleClick = () => this.activeIndex = index
		const onClick = tab.props.onClick || handleClick
        const onExpandClick = this.handleExpandClick

        return (
            <Header key={index} {...{active, expanded, onClick, onExpandClick}}>
                {tab.props.title}
            </Header>
        )
	}
	renderTabPanel(tab, index) {
        const {panel, children} = tab.props

        if (!children) {
            return null
        }

        if (panel) {
            return cloneElement(panel, {index})
        }

		return (
			<Panel key={index} active={this.activeIndex === index}>
				{tab.props.children}
			</Panel>
		)
	}
	render() {
		const {tabs, opened} = this
        const {theme} = this.props

		return (
			<div>
				<ul role='tablist' styleName={`List--${theme} ${opened ? 'List--Opened' : ''}`}>
					{tabs.map(this.renderTabHeader, this)}
				</ul>
				{tabs.map(this.renderTabPanel, this)}
			</div>
		)
	}
}
