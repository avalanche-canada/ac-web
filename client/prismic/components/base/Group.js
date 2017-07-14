import { createElement, DOM } from 'react'
import { compose, mapProps, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

export default compose(
    setPropTypes({
        value: PropTypes.array.isRequired,
        Component: PropTypes.object.isRequired,
    }),
    mapProps(({ value, Component, ...props }) => ({
        ...props,
        children: value.map((item, index) =>
            createElement(Component, {
                key: index,
                ...item,
            })
        ),
    }))
)(DOM.div)
