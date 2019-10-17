import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { pathname } from 'router/prismic'
import { Loading } from 'components/text'
import * as params from 'prismic/params'
import { useDocument } from 'prismic/hooks'

DocumentLink.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    isBroken: PropTypes.bool.isRequired,
    children: PropTypes.node,
}

export default function DocumentLink({ children, isBroken, ...props }) {
    return <Link to={pathname(props)}>{children || <Title {...props} />}</Link>
}

// Utils
function Title({ type, uid }) {
    const [document, pending] = useDocument(params.uid(type, uid))

    return pending ? <Loading /> : document?.data?.title
}
