import React, {PropTypes} from 'react'
import {compose, mapProps} from 'recompose'
import Navbar from 'components/navbar'
import Application, {Content} from 'components/application'
import Footer from 'components/footer'
import {withRouter} from 'react-router'

App.propTypes = {
    children: PropTypes.element.isRequired,
}

function App({ children, router }) {
    const withFooter = !router.isActive('/', true)
    const navbar = {
        isFoundation: router.isActive('foundation'),
        onLogin() {
            router.replace('login')
        },
        onLogout() {
            router.replace('logout')
        },
    }

    return (
        <Application>
            <Navbar {...navbar} />
            <Content>
                {children}
                {withFooter && <Footer />}
            </Content>
        </Application>
    )
}

export default withRouter(App)
