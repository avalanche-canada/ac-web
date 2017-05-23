import React from 'react'
import PropTypes from 'prop-types'
import Slice from './Slice'

SliceZone.propTypes = {
    value: PropTypes.arrayOf(PropTypes.shape(Slice.propTypes)).isRequired,
}

export default function SliceZone({ value }) {
    return (
        <div>
            {value.map((slice, index) => (
                <Slice
                    key={index}
                    label={slice.slice_label}
                    type={slice.slice_type}
                    value={slice.value}
                />
            ))}
        </div>
    )
}
