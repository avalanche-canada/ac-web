import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '~/prismic/components/base'
import { Item } from '~/components/sidebar'

function createItem({ link, title = {} }, index) {
    return (
        <Item key={index}>
            <Link {...link}>
                {title.value}
            </Link>
        </Item>
    )
}

ItemSet.propTypes = {
    value: PropTypes.array,
}

export default function ItemSet({ value }) {
    return (
        <div>
            {value.map(createItem)}
        </div>
    )
}
