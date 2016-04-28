import React, { Component, PropTypes, Children, cloneElement } from 'react'
import CSSModules from 'react-css-modules'
import Panel from './Panel'
import styles from './Tab.css'

function childrenToTabs(children) {
	return Children.toArray(children).filter(tab => !!tab)
}

function K() {}

class TabSet extends React.Component {
	static propTypes = {
		activeIndex: PropTypes.number,
		onActivate: PropTypes.func,
	}
	static defaultProps = {
		activeIndex: 0,
        onActivate: K,
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
		this.props.onActivate(this.state.activeIndex)
	}
	componentWillReceiveProps({ activeIndex, children }) {
		if (typeof activeIndex !== 'number') {
			return
		}

		const { length } = childrenToTabs(children)

		this.activeIndex = Math.min(activeIndex, length - 1)
	}
	renderTabHeader(tab, index) {
		const styleName = index === this.activeIndex ? 'ListItem--active' : 'ListItem'
		const onClick = () => this.activeIndex = index
        const item = (
            <li role='tab' key={index} {...{onClick, styleName}} >
				{tab.props.title}
			</li>
        )
// console.log(this.props.styles)
return item
		return CSSModules(item, styles)
	}
	renderTabPanel(tab, index) {
		return (
			<Panel active={this.activeIndex === index}>
				{tab.props.children}
			</Panel>
		)
	}
	render() {
		const { tabs } = this

		return (
			<div>
				<ul role='tablist' styleName='List'>
					{tabs.map(this.renderTabHeader, this)}
				</ul>
				{tabs.map(this.renderTabPanel, this)}
			</div>
		)
	}
}

export default CSSModules(TabSet, styles)
