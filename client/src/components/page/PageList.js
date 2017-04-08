import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import Page from './Page'
import Header from './Header'
import Main from './Main'
import Content from './Content'
import Headline from './Headline'
import Section from './Section'
import {Loading} from 'components/misc'
import styles from './Page.css'

PageList.propTypes = {
    title: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    myProp: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })),
}

function PageList({title, headline, items}) {
    return (
        <Page styleName='PageList'>
            <Header title={title} />
            <Content>
                <Main>
                    <Section>
                        <Headline>
                            {headline}
                        </Headline>
                        {items.isEmpty() ?
                            <Loading /> :
                            <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.link}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        }
                    </Section>
                </Main>
            </Content>
        </Page>
    )
}

export default CSSModules(PageList, styles)
