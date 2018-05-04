import React from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'

Home.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array.isRequired,
}

export default function Home({ title, body }) {
    return (
        <div>
            <h1>{title}</h1>
            <StructuredText value={body} />
        </div>
    )
}
