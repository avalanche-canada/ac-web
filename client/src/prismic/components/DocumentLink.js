import {PropTypes} from 'react'
import {Link} from 'react-router'
import {compose, mapProps, setDisplayName} from 'recompose'
import {documentLink} from 'containers/connectors'
import {pathname, title} from 'utils/prismic'

export default compose(
    setDisplayName('DocumentLink'),
    documentLink,
    mapProps(({document = {}, status, ...props}) => ({
        to: pathname(props),
        children: status.isLoading ? 'Loading title...' : title(document),
    }))
)(Link)
