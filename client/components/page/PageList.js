import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import Page from './Page'
import Header from './Header'
import Main from './Main'
import Content from './Content'
import Headline from './Headline'
import Section from './Section'
import { Loading } from 'components/text'
import styles from './Page.css'

PageList.propTypes = {
    title: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
}

function renderItem(item) {
    const link = typeof item.link === 'string' ? { to: item.link } : item.link

    return (
        <li key={item.name}>
            <Link {...link}>{item.name}</Link>
        </li>
    )
}

function PageList({ title, headline, items }) {
    return (
        <Page styleName="PageList">
            <Header title={title} />
            <Content>
                <Main>
                    <Section>
                        <Headline>{headline}</Headline>
                        {items.isEmpty() ? (
                            <Loading />
                        ) : (
                            <ul>{items.map(renderItem)}</ul>
                        )}
                    </Section>
                </Main>
            </Content>
        </Page>
    )
}

export default CSSModules(PageList, styles)
