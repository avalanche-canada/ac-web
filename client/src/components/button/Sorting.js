import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {compose, setDisplayName, setPropTypes, withProps, mapProps, defaultProps, withState, withHandlers, onlyUpdateForKeys} from 'recompose'
import {ExpandLess, ExpandMore, Remove} from '../icons'
import Button from './Button'
import {SUBTILE} from './kinds'
import {ASC, DESC, NONE} from '/constants/sortings'
import noop from 'lodash/noop'

const SORTINGS = [NONE, ASC, DESC]

const ICONS = new Map([
    [ASC, <ExpandLess />],
    [DESC, <ExpandMore />],
    [NONE, <Remove />],
])

const TITLES = new Map([
    [ASC, 'Ascending'],
    [DESC, 'Desccending'],
    [NONE, null],
])

export default class Sorting extends PureComponent {
    static propTypes = {
        sorting: PropTypes.oneOf(SORTINGS).isRequired,
        onChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        onChange: noop,
    }
    state = {
        sorting: NONE,
    }
    constructor(props) {
        super(props)

        this.state.sorting = props.sorting || NONE
    }
    get sorting() {
        return this.state.sorting
    }
    set sorting(sorting) {
        this.setState({sorting}, () => {
            this.props.onChange(sorting)
        })
    }
    get next() {
        const sorting = this.sorting.toLowerCase()

        return SORTINGS[SORTINGS.indexOf(sorting) + 1] || SORTINGS[0]
    }
    handleClick = event => {
        this.sorting = this.next
    }
    componentWillReceiveProps({sorting}) {
        if (sorting !== this.sorting) {
            this.setState({sorting})
        }
    }
    render() {
        const {sorting} = this

        return (
            <Button onClick={this.handleClick} kind={SUBTILE} icon={ICONS.get(sorting)} title={TITLES.get(sorting)} />
        )
    }
}
