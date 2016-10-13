import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import Page from './Page'
import Content from './Content'
import Main from './Main'
import {ButtonSet} from 'components/button'
import styles from './Page.css'
import {Generic} from 'prismic/components'
import {InnerHTML} from 'components/misc'
import {Credit} from 'components/markup'

WorkInProgress.propTypes = {
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    oldUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
}

function WorkInProgress({uid, name, oldUrl, title, subtitle}) {
    return (
        <Page styleName='WorkInProgress'>
            <Content>
                <Main>
                    <h1>
                        <InnerHTML>
                            {title}
                        </InnerHTML>
                    </h1>
                    <div>
                        <h2>
                            <InnerHTML>
                                {subtitle}
                            </InnerHTML>
                        </h2>
                        <ButtonSet>
                            <Link to={oldUrl} target='_blank' styleName='Link'>
                                {name}
                            </Link>
                        </ButtonSet>
                    </div>
                    <Credit>
                        RavenEye Photography
                    </Credit>
                </Main>
            </Content>
        </Page>
    )
}

export default CSSModules(WorkInProgress, styles)
