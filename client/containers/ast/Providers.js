import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as ast from 'api/requests/ast'

ProviderContainer.propTypes = {
    children: PropTypes.func.isRequired,
    tags: PropTypes.instanceOf(Set),
}

export default function ProviderContainer({ children, tags }) {
    return (
        <Fetch cache={CACHE} request={ast.providers(PARAMS)}>
            {({ data, loading }) => {
                let results = data?.results

                if (Array.isArray(results) && tags && tags.size > 0) {
                    results = results.filter(
                        course =>
                            course.is_sponsor ||
                            course.tags.some(tag => tags.has(tag))
                    )
                }

                return children({
                    loading,
                    providers: results,
                })
            }}
        </Fetch>
    )
}

// Constants and utils
const CACHE = new Memory()
const PARAMS = {
    page_size: 1000,
}
