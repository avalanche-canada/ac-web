import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ExpandLess, ExpandMore, Remove } from 'components/icons'
import Button from './Button'
import { SUBTILE } from './kinds'
import noop from 'lodash/noop'
import { NONE, ASC, DESC } from 'constants/sortings'

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

        /* eslint-disable react/no-direct-mutation-state */
        this.state.sorting = props.sorting || NONE
        /* eslint-disable react/no-direct-mutation-state */
    }
    get sorting() {
        return this.state.sorting
    }
    set sorting(sorting) {
        this.setState({ sorting }, () => {
            this.props.onChange(sorting)
        })
    }
    get next() {
        const sorting = this.sorting.toLowerCase()

        return SORTINGS[SORTINGS.indexOf(sorting) + 1] || SORTINGS[0]
    }
    handleClick = () => {
        this.sorting = this.next
    }
    componentWillReceiveProps({ sorting }) {
        if (sorting !== this.sorting) {
            this.setState({ sorting })
        }
    }
    render() {
        const { sorting } = this

        return (
            <Button
                onClick={this.handleClick}
                kind={SUBTILE}
                icon={ICONS.get(sorting)}
                title={TITLES.get(sorting)}
            />
        )
    }
}
