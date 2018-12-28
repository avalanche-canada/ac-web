import React from 'react'
import PropTypes from 'prop-types'
import { Article, Header } from 'components/page'

Layout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

export default function Layout({ title, children }) {
    return (
        <Article>
            <Header title={title} />
            {children}
        </Article>
    )
}
