import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Legend, ControlSet, Control } from 'components/form'
import { DropdownFromOptions, Geocoder, DateRange } from 'components/controls'
import { LEVELS, TAGS } from './constants'
import { ASC } from 'constants/sortings'

export class Courses extends PureComponent {
    static propTypes = {
        level: PropTypes.oneOf(Array.from(LEVELS.keys())),
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
        tags: PropTypes.instanceOf(Set),
        place: PropTypes.object,
        onParamsChange: PropTypes.func.isRequired,
    }
    sendParamsChange(params) {
        this.props.onParamsChange(params)
    }
    handleLevelChange = level => {
        if (level === this.props.level) {
            level = undefined
        }

        this.sendParamsChange({ level })
    }
    handleDateRangeChange = range => {
        this.sendParamsChange(range)
    }
    handleTagsChange = tags => {
        this.sendParamsChange({ tags })
    }
    handlePlaceChange = place => {
        this.sendParamsChange({
            place,
            sorting: place ? ['distance', ASC] : null,
        })
    }
    render() {
        const { level, from, to, tags, place } = this.props

        return (
            <Layout legend="Find a course">
                <Control>
                    <DropdownFromOptions
                        onChange={this.handleLevelChange}
                        value={level}
                        placeholder="Level"
                        options={LEVELS}
                    />
                </Control>
                <Control>
                    <DateRange
                        from={from}
                        to={to}
                        onChange={this.handleDateRangeChange}
                        container={this}
                    />
                </Control>
                <Control>
                    <DropdownFromOptions
                        multiple
                        onChange={this.handleTagsChange}
                        value={tags}
                        placeholder="Filter by"
                        options={TAGS}
                    />
                </Control>
                <Control>
                    <Geocoder
                        placeholder="Location"
                        onChange={this.handlePlaceChange}
                        value={place?.text}
                    />
                </Control>
            </Layout>
        )
    }
}

export class Providers extends PureComponent {
    static propTypes = {
        tags: PropTypes.instanceOf(Set),
        place: PropTypes.object,
        onParamsChange: PropTypes.func.isRequired,
    }
    sendParamsChange(params) {
        this.props.onParamsChange(params)
    }
    handleTagsChange = tags => {
        this.sendParamsChange({ tags })
    }
    handlePlaceChange = place => {
        this.sendParamsChange({
            place,
            sorting: place ? ['distance', ASC] : null,
        })
    }
    render() {
        const { tags, place } = this.props

        return (
            <Layout legend="Find a provider">
                <Control>
                    <DropdownFromOptions
                        onChange={this.handleTagsChange}
                        value={tags}
                        placeholder="Filter by"
                        options={TAGS}
                    />
                </Control>
                <Control>
                    <Geocoder
                        placeholder="Location"
                        onChange={this.handlePlaceChange}
                        value={place?.text}
                    />
                </Control>
            </Layout>
        )
    }
}

// Utils
Layout.propTypes = {
    legend: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

function Layout({ legend, children }) {
    return (
        <Form style={STYLE}>
            <Legend>{legend}</Legend>
            <ControlSet horizontal>{children}</ControlSet>
        </Form>
    )
}

// Styles
const STYLE = {
    margin: 'auto',
    position: 'relative',
}
