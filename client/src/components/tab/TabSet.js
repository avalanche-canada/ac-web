import React, { Component, PropTypes, Children} from 'react'
import CSSModules from 'react-css-modules'
import Panel from './Panel'
import Header from './Header'
import styles from './Tab.css'
import {ExpandLess, ExpandMore} from 'components/icons'
import Button, {INCOGNITO} from 'components/button'
import {init} from 'css-element-queries/src/ElementQueries'

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
        arrow: PropTypes.bool,
	}
	static defaultProps = {
		activeIndex: 0,
        onActivate: K,
        theme: COMPACT,
        arrow: false,
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
	handleActivate = () => {
        this.opened = false
		this.props.onActivate(this.state.activeIndex)
	}
    componentDidMount() {
        init()
    }
    componentDidUpdate() {
        init()
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
        const {arrow} = this.props
        const expanded = this.opened
        const active = index === this.activeIndex
        const handleClick = () => this.activeIndex = index
		const onClick = tab.props.onClick || handleClick
        const onExpandClick = this.handleExpandClick
        const {title, color} = tab.props

        return (
            <Header key={index} {...{active, expanded, onClick, onExpandClick, color, arrow}}>
                {title}
            </Header>
        )
	}
	renderTabPanel(tab, index) {
        const {children} = tab.props

        if (children) {
            return (
                <Panel key={index} active={this.activeIndex === index}>
                    {children}
                </Panel>
            )
        }

        return null
	}
	render() {
		const {tabs, opened} = this
        const {theme} = this.props
        let styleName = `List--${theme}`

        if (opened) {
            styleName += ' List--Opened'
        }


		return (
			<div>
				<ul role='tablist' styleName={styleName}>
					{tabs.map(this.renderTabHeader, this)}
				</ul>
				{tabs.map(this.renderTabPanel, this)}
			</div>
		)
	}
}
