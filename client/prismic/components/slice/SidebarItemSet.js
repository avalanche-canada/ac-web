import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '~/prismic/components/base'
import { Item } from '~/components/sidebar'

function createItem({ link, title }, index) {
    return (
        <Item key={index}>
            <Link {...link}>
                {title}
            </Link>
        </Item>
    )
}

ItemSet.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object.isRequired),
}

export default function ItemSet({ value }) {
    return (
        <div>
            {value.map(createItem)}
        </div>
    )
}
