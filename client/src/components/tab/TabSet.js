import React, { Component, PropTypes, Children } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Tab.css'

function childrenToTabs(children) {
	return Children.toArray(children).filter(tab => !!tab)
}

class TabSet extends React.Component {
	static propTypes = {
		activeIndex: PropTypes.number,
		onActivate: PropTypes.func,
	}
	static defaultProps = {
		activeIndex: 0
	}
	constructor(props, ...args) {
	  super(props, ...args)

	  const { activeIndex } = props

	  this.state = { activeIndex }

	  this.handleActivate = this.handleActivate.bind(this)
	}
	get activeIndex() {
		return this.state.activeIndex
	}
	set activeIndex(activeIndex) {
		this.setState({ activeIndex }, this.handleActivate)
	}
	get tabs() {
		return childrenToTabs(this.props.children)
	}
	handleActivate() {
		const { onActivate } = this.props

		if (typeof onActivate === 'function') {
			onActivate(activeIndex)
		}
	}
	componentWillReceiveProps({ activeIndex, children }) {
		if (typeof activeIndex !== 'number') {
			return
		}

		const { length } = childrenToTabs(children)

		this.activeIndex = Math.min(activeIndex, length - 1)
	}
	renderTab(tab, index) {
		const styleName = index === this.activeIndex ? 'ListItem--active' : 'ListItem'
		const onClick = () => this.activeIndex = index

		return (
			<li key={index} {...{onClick, styleName}} >
				{tab.props.title}
			</li>
		)
	}
	render() {
		const { tabs } = this
		const tab = tabs[this.activeIndex]

		return (
			<div>
				<ul styleName='List'>
					{tabs.map(this.renderTab, this)}
				</ul>
				<div styleName='Content'>
					{tab && tab.props.children}
				</div>
			</div>
		)
	}
}

export default CSSModules(TabSet, styles)
