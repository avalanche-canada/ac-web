import React, {Component, PropTypes, Children} from 'react'
import CSSModules from 'react-css-modules'
import Panel from './Panel'
import Header from './Header'
import styles from './Tab.css'
import {ExpandLess, ExpandMore} from 'components/icons'
import Button, {INCOGNITO} from 'components/button'
import {init} from 'css-element-queries/src/ElementQueries'

function toArray(children) {
	return Children.toArray(children).filter(Boolean)
}
function isEnabled({props}) {
    return !props.disabled
}
function validateActiveIndex({activeIndex, children}) {
    const tabs = toArray(children)

    if (!tabs.length) {
        return 0    
    }

    const {disabled} = tabs[activeIndex].props

    if (disabled === true) {
        const enabled = tabs.find(isEnabled)

        activeIndex = tabs.indexOf(enabled)
    }

    return Math.min(activeIndex, tabs.length - 1)
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
        opened: false,
    }
	constructor(props, ...args) {
	  super(props, ...args)

	  this.state.activeIndex = validateActiveIndex(props)
	}
	get activeIndex() {
		return this.state.activeIndex
	}
	set activeIndex(activeIndex) {
		this.setState({activeIndex}, this.handleActivate)
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
	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.activeIndex !== 'number') {
			return
		}

		this.activeIndex = validateActiveIndex(nextProps)
	}
    handleExpandClick = event => {
        event.stopPropagation()

        this.opened = !this.opened
    }
	renderTabHeader(tab, index) {
        const {theme, arrow} = this.props
        const {title, color, disabled, onClick} = tab.props
        const handleClick = event => this.activeIndex = index
        const header = {
            active: index === this.activeIndex,
            expanded: this.opened,
            onClick: disabled ? K : onClick || handleClick,
            onExpandClick: this.handleExpandClick,
            arrow: theme === LOOSE ? true : arrow,
            color,
            disabled,
        }

        return (
            <Header key={index} {...header}>
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
