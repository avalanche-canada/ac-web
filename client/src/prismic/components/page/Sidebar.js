import React from 'react'
import PropTypes from 'prop-types'
import {withProps} from 'recompose'
import Sidebar, {Contact, Item, Header} from '~/components/sidebar'
import DocumentLink from '~/prismic/components/DocumentLink'
import {Link} from 'react-router'
import {href, avalancheCanadaPathRegex} from '~/utils/url'

function renderLink({title, link}) {
    if (typeof link === 'object') {
        return (
            <DocumentLink {...link}>
                {title}
            </DocumentLink>
        )
    }

    if (avalancheCanadaPathRegex.test(link)) {
        return (
            <Link to={href(link)} title={title}>
                {title}
            </Link>
        )
    }

    return (
        <a href={link} title={title}>
            {title}
        </a>
    )
}

export default withProps(({content, contact}) => ({
    children: content.map(({type, content}, index) => {
        switch (type) {
            case 'header':
                return (
                    <Header key={index}>
                        {content}
                    </Header>
                )
            case 'items':
                return content.map((link, index) => (
                    <Item key={index}>
                        {renderLink(link)}
                    </Item>
                ))
            default:
                return null
        }
    }),
    contact: typeof contact === 'string' ? <Contact email={contact} /> : contact,
}))(Sidebar)
