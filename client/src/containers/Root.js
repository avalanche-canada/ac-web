import React, {PropTypes, createElement} from 'react'
import Application, {Content} from 'components/application'
import {AvalancheCanada} from 'containers/Navbar'
import Footer from 'components/footer'

Root.propTypes = {
    navbar: PropTypes.element,
    content: PropTypes.element.isRequired,
    footer: PropTypes.element,
    children: PropTypes.element,
}

export default function Root({navbar, content, footer, children}) {
    return (
        <Application>
            {navbar || <AvalancheCanada />}
            <Content>
                {children || content}
                {footer !== null && <Footer />}
            </Content>
        </Application>
    )
}
