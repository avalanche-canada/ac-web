import {PropTypes} from 'react'
import {Link} from 'react-router'
import {compose, mapProps, setDisplayName} from 'recompose'
import {documentLink} from 'containers/connectors'
import {pathname, title} from 'utils/prismic'

export default compose(
    setDisplayName('DocumentLink'),
    documentLink,
    mapProps(({children, document, status, ...props}) => ({
        to: pathname(props),
        children: children ||
            status.isLoading || !document ? 'Loading title...' : title(document),
    }))
)(Link)
