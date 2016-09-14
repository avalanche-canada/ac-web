import React, {PropTypes} from 'react'
import {compose, withHandlers} from 'recompose'
import {withRouter} from 'react-router'
import CSSModules from 'react-css-modules'
import {Page, Content, Main, Header} from 'components/page'
import Button from 'components/button'
import styles from 'components/button/Button.css'

NotFound.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node,
}

const BUTTON = {
    width: 350,
    marginTop: '2em',
}

function NotFound({
    title = 'This is an avalanche size 404 error...',
    subtitle = 'The page you are looking for has not been found.',
    children,
    router,
    handleGoBackClick,
}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <h2>{subtitle}</h2>
                    {children}
                    <Button style={BUTTON} styleName='ChevronLeft Large' onClick={handleGoBackClick}>
                        Go back to your previous page
                    </Button>
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
    CSSModules(styles, {allowMultiple: true})
)(NotFound)
