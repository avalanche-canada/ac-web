import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Layout from './Layout'
import { Control } from 'components/form'
import { DropdownFromOptions, Geocoder, DateRange } from 'components/controls'
import { LEVELS, TAGS } from '../constants'

export default class Courses extends PureComponent {
    static propTypes = {
        level: PropTypes.oneOf(Array.from(LEVELS.keys())),
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
        tags: PropTypes.instanceOf(Set),
        place: PropTypes.object,
        onParamsChange: PropTypes.func.isRequired,
    }
    state = {
        place: this.props.place,
        level: this.props.level,
        from: this.props.from,
        to: this.props.to,
        tags: this.props.tags,
    }
    handleParamsChange = () => this.props.onParamsChange(this.state)
    handleLevelChange = level =>
        this.setState({ level }, this.handleParamsChange)
    handleDateRangeChange = range =>
        this.setState(range, this.handleParamsChange)
    handleTagsChange = tags => this.setState({ tags }, this.handleParamsChange)
    handlePlaceChange = place =>
        this.setState({ place }, this.handleParamsChange)
    render() {
        return (
            <Layout legend="Find a course">
                <Control>
                    <DropdownFromOptions
                        onChange={this.handleLevelChange}
                        value={this.state.level}
                        placeholder="Level"
                        options={LEVELS}
                    />
                </Control>
                <Control>
                    <DateRange
                        from={this.state.from}
                        to={this.state.to}
                        onChange={this.handleDateRangeChange}
                        container={this}
                    />
                </Control>
                <Control>
                    <DropdownFromOptions
                        multiple
                        onChange={this.handleTagsChange}
                        value={this.state.tags}
                        placeholder="Filter by"
                        options={TAGS}
                    />
                </Control>
                <Control>
                    <Geocoder
                        placeholder="Location"
                        onChange={this.handlePlaceChange}
                        value={get(this.state, 'place.text')}
                    />
                </Control>
            </Layout>
        )
    }
}
