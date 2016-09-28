import React, {PropTypes} from 'react'
import {compose, withHandlers} from 'recompose'
import {withRouter, Link} from 'react-router'
import CSSModules from 'react-css-modules'
import {Page, Content, Main, Header, Banner} from 'components/page'
import Button from 'components/button'
import styles from './Page.css'

NotFound.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
}

function NotFound({
    title = 'This is an avalanche size 404 error...',
    subtitle = 'The page you are looking for has not been found.',
    handleGoBackClick,
}) {
    return (
        <Page styleName='NotFound'>
            <Content>
                <Main>
                    <h1>{title}</h1>
                    <div>
                        <h2>{subtitle}</h2>
                        <Button styleName='GoBackButton' onClick={handleGoBackClick}>
                            Go back to your previous page
                        </Button>
                    </div>
                </Main>
            </Content>
        </Page>
    )
}

export default compose(
    withRouter,
    withHandlers({
        handleGoBackClick: props => event => {
            props.router.goBack()
        },
    }),
    CSSModules(styles)
)(NotFound)
