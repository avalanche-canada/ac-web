import PropTypes from 'prop-types'
import Link from 'react-router/lib/Link'
import {compose, mapProps, setPropTypes} from 'recompose'
import {pathname, title} from '~/utils/prismic'

export default compose(
    setPropTypes({
        document: PropTypes.object.isRequired,
        children: PropTypes.node,
    }),
    mapProps(({children, document, ...props}) => ({
        ...props,
        to: pathname(document),
        children: children || title(document),
    }))
)(Link)
