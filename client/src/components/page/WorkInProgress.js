import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import Page from './Page'
import Content from './Content'
import Main from './Main'
import {ButtonSet} from 'components/button'
import styles from './Page.css'
import {InnerHTML} from 'components/misc'
import {Credit} from 'components/markup'

WorkInProgress.propTypes = {
    name: PropTypes.string.isRequired,
    oldUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
}

WorkInProgress.defaultProps = {
    title: 'We are currently working on this page...',
    subtitle: 'For now, you can visit this page on our old website.',
}

function WorkInProgress({
    name,
    oldUrl,
    title = WorkInProgress.defaultProps.title,
    subtitle = WorkInProgress.defaultProps.subtitle,
}) {
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
