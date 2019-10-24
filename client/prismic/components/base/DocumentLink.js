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

    if (pending) {
        return <Loading />
    }

    if (!document?.data?.title) {
        return null
    }

    const { title } = document.data

    if (typeof title == 'string') {
        return title
    }

    if (Array.isArray(title)) {
        return title[0].text // <StructuredText>
    }

    return null
}
