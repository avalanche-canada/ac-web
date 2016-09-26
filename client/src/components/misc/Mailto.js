import React, {PropTypes, DOM} from 'react'
import {compose, defaultProps, withProps, setDisplayName, setPropTypes} from 'recompose'
import Url from 'url'
import {AVALANCHECANADA} from 'constants/emails'

export default compose(
    setDisplayName('Mailto'),
    setPropTypes({
        email: PropTypes.string,
        title: PropTypes.string,
        subject: PropTypes.string,
        cc: PropTypes.string,
        bcc: PropTypes.string,
        body: PropTypes.string,
    }),
    defaultProps({
        email: AVALANCHECANADA,
        title: 'Email Avalanche Canada',
    }),
    withProps(({email, title, children, subject, cc, bcc, body}) => ({
        children: children || email,
        href: Url.format({
            protocol: 'mailto',
            pathname: email,
            query: {
                subject,
                cc,
                bcc,
                body
            },
        }),
    }))
)(DOM.a)
