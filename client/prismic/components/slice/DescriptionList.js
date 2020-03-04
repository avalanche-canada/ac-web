import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'

DescriptionList.propTypes = {
    items: PropTypes.array.isRequired,
}

export default function DescriptionList({ items }) {
    return (
        <dl>
            {items.map(({ term, description }) => (
                <Fragment>
                    <dt>{term}</dt>
                    <dd>
                        <StructuredText value={description} />
                    </dd>
                </Fragment>
            ))}
        </dl>
    )
}
