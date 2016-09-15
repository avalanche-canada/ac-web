import React, {PropTypes} from 'react'
import Application, {Content} from 'components/application'
import {AvalancheCanada} from 'containers/Navbar'
import Highlight from 'containers/Highlight'
import Footer from 'components/footer'

Root.propTypes = {
    navbar: PropTypes.element,
    content: PropTypes.element,
    footer: PropTypes.element,
    children: PropTypes.element,
}

export default function Root({navbar, content, footer, children, route}) {
    return (
        <Application>
            {navbar || <AvalancheCanada />}
            <Highlight />
            <Content>
                {children || content}
                {footer !== null && <Footer />}
            </Content>
        </Application>
    )
}
