import {PropTypes} from 'react'
import {Link} from 'react-router'
import {compose, withProps, setPropTypes} from 'recompose'
import {title, pathname} from 'utils/prismic'

export default compose(
    setPropTypes({
        document: PropTypes.object.isRequired,
    }),
    withProps(({document}) => ({
        to: pathname(document),
        children: title(document),
        document: undefined,
    }))
)(Link)
