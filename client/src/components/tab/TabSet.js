import React, {Component, PropTypes, Children} from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import Tab from './Tab'
import Panel from './Panel'
import Header from './Header'
import styles from './Tab.css'
import {ExpandLess, ExpandMore} from 'components/icons'
import Button, {INCOGNITO} from 'components/button'
import noop from 'lodash/noop'
import debounce from 'lodash/debounce'

function toArray(children) {
	return Children.toArray(children).filter(Boolean)
}

function isEnabled(tab) {
    return !tab.props.disabled
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

export const COMPACT = 'Compact'
export const LOOSE = 'Loose'

function sumNodeWidth(width, node) {
    // SHAME: This slows down rendering! Lots of refloat
    const {position} = node.style

    node.style.position = 'absolute'

    const {offsetWidth} = node

    node.style.position = position

    return width + Math.ceil(offsetWidth)
}

@CSSModules(styles, {allowMultiple: true})
class TabList extends Component {
    state = {
        width: null,
        itemsWidth: null,
    }
    updateWidths = () => {
        const {offsetWidth, childNodes} = this.refs.list

        this.setState({
            width: Math.ceil(offsetWidth),
            itemsWidth: Array.from(childNodes).reduce(sumNodeWidth, 0)
        })
    }
    updateWidthsForListeners = debounce(this.updateWidths, 150)
    get styleName() {
        const {theme, opened, stacked} = this.props
        const {itemsWidth, width} = this.state
        const styleNames = {
            List: true,
            'List--Stacked': typeof stacked === 'boolean' ? stacked : false,
            'List--Compact': theme === COMPACT,
            'List--Loose': theme === LOOSE,
            'List--Opened': opened,
        }

        if (typeof stacked !== 'boolean' && itemsWidth && width) {
            Object.assign(styleNames, {
                List: itemsWidth <= width,
                'List--Stacked': itemsWidth > width,
            })
        }

        return classNames(styleNames)
    }
    componentDidMount() {
        this.updateWidths()
        window.addEventListener('resize', this.updateWidthsForListeners, false)
        window.addEventListener('orientationchange', this.updateWidthsForListeners, false)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidthsForListeners)
        window.removeEventListener('orientationchange', this.updateWidthsForListeners)
    }
    render() {
        return (
            <ul role='tablist' styleName={this.styleName} ref='list'>
                {this.props.children}
            </ul>
        )
    }
}

export default class TabSet extends Component {
	static propTypes = {
        children: PropTypes.arrayOf(PropTypes.instanceOf(Tab)).isRequired,
		activeIndex: PropTypes.number,
		onActivate: PropTypes.func,
        theme: PropTypes.oneOf([LOOSE, COMPACT]),
        arrow: PropTypes.bool,
        lazy: PropTypes.bool,
        stacked: PropTypes.bool,
	}
	static defaultProps = {
		activeIndex: 0,
        onActivate: noop,
        theme: COMPACT,
        arrow: false,
        lazy: true,
	}
    state = {
        opened: false,
    }
	constructor(props) {
	  super(props)

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
	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.activeIndex === 'number') {
            this.activeIndex = validateActiveIndex(nextProps)
		}
	}
    handleExpandClick = event => {
        event.stopPropagation()

        this.opened = !this.opened
    }
	renderTabHeader(tab, index) {
        const {theme, arrow} = this.props
        const {title, color, disabled, onClick} = tab.props
        const handleClick = event => this.activeIndex = index
        const active = index === this.activeIndex
        const header = {
            active,
            expanded: this.opened,
            onClick: disabled ? noop : onClick || active ? this.handleExpandClick : handleClick,
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

        if (!children) {
            return null
        }

        if (this.props.lazy) {
            if (this.activeIndex === index) {
                return (
                    <Panel key={index} active>
                        {children}
                    </Panel>
                )
            } else {
                return null
            }
        }

        return (
            <Panel key={index} active={this.activeIndex === index}>
                {children}
            </Panel>
        )
	}
	render() {
        const {theme, stacked} = this.props

		return (
            <div>
                <TabList stacked={stacked} opened={this.opened} theme={theme}>
                    {this.tabs.map(this.renderTabHeader, this)}
                </TabList>
                {this.tabs.map(this.renderTabPanel, this)}
            </div>
		)
	}
}
