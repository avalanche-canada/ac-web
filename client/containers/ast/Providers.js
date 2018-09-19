import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as ast from 'api/requests/ast'

export default class ProviderContainer extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        tags: PropTypes.instanceOf(Set),
    }
    children = props => {
        const { tags } = this.props
        let results = props.data?.results

        if (Array.isArray(results) && tags && tags.size > 0) {
            results = results.filter(
                course =>
                    course.is_sponsor || course.tags.some(tag => tags.has(tag))
            )
        }

        return this.props.children({
            loading: props.loading,
            providers: results,
        })
    }
    render() {
        return (
            <Fetch cache={CACHE} request={ast.providers(PARAMS)}>
                {this.children}
            </Fetch>
        )
    }
}

// Constatns and utils
const CACHE = new Memory()
const PARAMS = {
    page_size: 1000,
}
