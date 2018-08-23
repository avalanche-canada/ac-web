import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Layout from './Layout'
import { Control } from 'components/form'
import { DropdownFromOptions, Geocoder } from 'components/controls'
import { TAGS } from '../constants'
import { DESC } from 'constants/sortings'

export default class Courses extends PureComponent {
    static propTypes = {
        tags: PropTypes.instanceOf(Set),
        place: PropTypes.object,
        onParamsChange: PropTypes.func.isRequired,
    }
    state = {
        place: this.props.place,
        tags: this.props.tags,
    }
    handleParamChange = () => {
        this.props.onParamsChange(this.state)
    }
    handleTagsChange = tags => {
        this.setState({ tags }, this.handleParamChange)
    }
    handlePlaceChange = place => {
        const sorting = ['distance', DESC]

        this.setState({ place, sorting }, this.handleParamChange)
    }
    render() {
        return (
            <Layout legend="Find a provider">
                <Control>
                    <DropdownFromOptions
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
