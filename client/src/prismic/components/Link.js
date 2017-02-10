import {PropTypes} from 'react'
import {Link} from 'react-router'
import {compose, mapProps, setPropTypes} from 'recompose'
import {title, pathname} from 'utils/prismic'

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
