import React from 'react'
import PropTypes from 'prop-types'
import InlineImage from './InlineImage'

Image.propTypes = {
    value: PropTypes.shape({
        main: PropTypes.shape(InlineImage.propTypes).isRequired,
    }).isRequired,
}

export default function Image({ value }) {
    return <InlineImage {...value.main} />
}
