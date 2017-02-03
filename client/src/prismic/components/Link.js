import {PropTypes} from 'react'
import {Link} from 'react-router'
import {compose, mapProps, setPropTypes} from 'recompose'
import {pathname, title} from 'utils/prismic'

export default compose(
    setPropTypes({
        document: PropTypes.object.isRequired,
    }),
    mapProps(({document}) => ({
        to: pathname(document),
        children: title(document),
    }))
)(Link)
